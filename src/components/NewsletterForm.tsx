import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Coloque seu nome" }),
  email: z.string().min(1, { message: "Coloque seu email" }).email({
    message: "Email deve ser válido",
  }),
  access_key: z.string(),
  botcheck: z.boolean(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function NewsletterForm() {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      "https://hook.us1.make.com/ja6piue2ywxoxy59qkqsrmpckghleumq",
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
      className="mx-auto flex items-center gap-5"
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

      <input
        className="rounded-lg bg-purple-400 p-2 text-white hover:cursor-pointer hover:bg-purple-300 "
        type="submit"
      />
      {status && <p className="text-center">{status}</p>}
    </form>
  );
}
