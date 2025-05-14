
import React from "react";
import RandomNumberGenerator from "@/components/RandomNumberGenerator";
import Icon from "@/components/ui/icon";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 bg-dark text-white">
        <div className="container px-4 mx-auto flex justify-center items-center">
          <div className="flex items-center">
            <div className="rounded-full bg-primary/20 p-2 mr-3">
              <Icon name="Dices" className="w-6 h-6 text-primary animate-bounce-light" />
            </div>
            <h1 className="text-2xl font-bold">РандомГен</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow container px-4 py-12 mx-auto">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark font-montserrat">
            Генерация случайных чисел
          </h2>
          <p className="text-gray-600 mb-8">
            Используйте форму ниже для генерации настоящих случайных чисел на основе алгоритма
            вихря Мерсенна. Задайте диапазон и количество чисел - и получите результат мгновенно.
          </p>
        </div>
        <RandomNumberGenerator />
      </main>

      <footer className="bg-dark text-white/80 py-6">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} РандомГен — Генератор случайных чисел на основе вихря Мерсенна
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
