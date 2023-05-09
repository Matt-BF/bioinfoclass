import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function DropdownMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="relative p-2 transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:block before:h-[2px] before:w-full before:origin-top-left before:scale-x-0 before:bg-blue-500 before:transition before:duration-300 before:ease-in-out before:content-[''] hover:text-blue-500 before:hover:scale-x-100">
          Serviços
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Cursos (em breve)
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/aulas"
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Aulas particulares
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/consultoria"
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Consultoria
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
