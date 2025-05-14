
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clipboard, RefreshCw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MersenneTwister } from "@/lib/mersenneTwister";

const mersenneTwister = new MersenneTwister();

export const RandomNumberGenerator: React.FC = () => {
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [count, setCount] = useState<number>(5);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { toast } = useToast();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinValue(isNaN(value) ? 0 : value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMaxValue(isNaN(value) ? 0 : value);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCount(isNaN(value) ? 0 : Math.min(1000, value));
  };

  const generateNumbers = () => {
    if (minValue > maxValue) {
      toast({
        title: "Ошибка диапазона",
        description: "Минимальное значение должно быть меньше или равно максимальному.",
        variant: "destructive",
      });
      return;
    }

    if (count <= 0 || count > 1000) {
      toast({
        title: "Ошибка количества",
        description: "Количество должно быть положительным числом и не больше 1000.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Небольшая задержка для анимации
    setTimeout(() => {
      const generatedNumbers = mersenneTwister.generateRandomNumbers(minValue, maxValue, count);
      setNumbers(generatedNumbers);
      setIsGenerating(false);
    }, 300);
  };

  const copyToClipboard = () => {
    if (numbers.length === 0) return;
    
    navigator.clipboard.writeText(numbers.join(", ")).then(() => {
      toast({
        title: "Скопировано!",
        description: "Числа скопированы в буфер обмена.",
      });
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/10 rounded-t-lg">
        <CardTitle className="text-2xl text-center text-dark">
          Генератор случайных чисел
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          На основе алгоритма вихря Мерсенна (Mersenne Twister)
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min">Минимальное значение</Label>
            <Input
              id="min"
              type="number"
              value={minValue}
              onChange={handleMinChange}
              className="focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max">Максимальное значение</Label>
            <Input
              id="max"
              type="number"
              value={maxValue}
              onChange={handleMaxChange}
              className="focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="count">Количество чисел</Label>
            <Input
              id="count"
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={handleCountChange}
              className="focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        <Button 
          onClick={generateNumbers}
          className="w-full bg-primary hover:bg-primary/90 text-white"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Clipboard className="w-4 h-4 mr-2" />
          )}
          Сгенерировать числа
        </Button>

        {numbers.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-montserrat font-medium">Результат:</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="text-xs"
              >
                <Copy className="w-3 h-3 mr-1" />
                Копировать
              </Button>
            </div>
            <div className="number-container">
              {numbers.map((num, index) => (
                <div key={index} className="result-number">
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 rounded-b-lg text-center text-xs text-gray-500 flex justify-center">
        <p>Вихрь Мерсенна - алгоритм генерации псевдослучайных чисел с периодом 2^19937-1</p>
      </CardFooter>
    </Card>
  );
};

export default RandomNumberGenerator;
