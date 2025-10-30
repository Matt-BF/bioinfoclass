import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Coloque seu nome" }),
  email: z.string().min(1, { message: "Coloque seu email" }).email({
    message: "Email deve ser válido",
  }),
  message: z.string().min(1, { message: "Coloque sua mensagem" }),
  access_key: z.string(),
  botcheck: z.boolean(),
  h_captcha_response: z
    .string()
    .min(1, { message: "Por favor, complete o hCaptcha" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setStatus("Enviando...");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.success) {
      setStatus(
        "Sua mensagem foi recebida! Em breve entraremos em contato com você!"
      );
    } else {
      setStatus(result.message);
    }

    const webhookResponse = await fetch(
      "https://hook.us1.make.com/rcvz8q9vrte0fqi4dogvh41ubmow0g3w",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  };

  return (
    <form
      id="contactForm"
      className="mx-auto mb-5 flex w-1/2 flex-col gap-5 rounded-lg border p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="hidden"
        value="1dbaa351-c61a-4b8a-9d8c-b41682f9a417"
        {...register("access_key")}
      />
      <input
        type="checkbox"
        id=""
        className="hidden"
        {...register("botcheck")}
      />
      <label htmlFor="name">Seu nome</label>
      <input
        {...register("name")}
        className="p-2 focus:outline-purple-400"
        placeholder="ex: João da Silva"
      />
      {errors.name && (
        <p className=" text-xs italic text-red-500">{errors.name?.message}</p>
      )}
      <label htmlFor="email">Seu Email</label>
      <input
        {...register("email")}
        className="p-2 focus:outline-purple-400"
        placeholder="ex: joao@gmail.com"
      />
      {errors.email && (
        <p className=" text-xs italic text-red-500">{errors.email?.message}</p>
      )}
      <label htmlFor="Sua Mensagem">Sua mensagem</label>
      <textarea
        {...register("message")}
        className="h-32 p-5 focus:outline-purple-400"
        placeholder="Escreva sua mensagem para nós por aqui"
      />
      {errors.message && (
        <p className="text-xs italic text-red-500">{errors.message?.message}</p>
      )}
      <div>
        <HCaptcha
          sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
          reCaptchaCompat={false}
          onVerify={(token) => setValue("h_captcha_response", token)}
        />
        {errors.h_captcha_response && (
          <p className="text-lg italic text-red-500 md:text-sm">
            {errors.h_captcha_response?.message}
          </p>
        )}
      </div>
      <input
        className="mx-auto rounded-lg bg-purple-400 p-4 text-white hover:cursor-pointer hover:bg-purple-300 "
        type="submit"
        value="Enviar"
      />

      {status && <p className="text-center">{status}</p>}
    </form>
  );
}
