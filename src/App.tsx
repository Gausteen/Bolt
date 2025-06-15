import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Apple, Activity, Target, AlertCircle } from 'lucide-react';
import PersonalInfo from './components/PersonalInfo';
import FoodIntake from './components/FoodIntake';
import Predictions from './components/Predictions';
import DietaryAdvice from './components/DietaryAdvice';

export interface PersonalData {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: number;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  quantity: number;
}

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalData, setPersonalData] = useState<PersonalData>({
    height: 0,
    weight: 0,
    age: 0,
    gender: 'male',
    activityLevel: 1.2
  });
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [predictions, setPredictions] = useState<any>(null);

  const calculateBMR = (data: PersonalData) => {
    // Harris-Benedict Formula
    if (data.gender === 'male') {
      return 88.362 + (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age);
    } else {
      return 447.593 + (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age);
    }
  };

  const calculatePredictions = () => {
    if (!personalData.weight || !personalData.height || !personalData.age) return;

    const bmr = calculateBMR(personalData);
    const tdee = bmr * personalData.activityLevel;
    const totalCaloriesConsumed = foodItems.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
    const calorieBalance = totalCaloriesConsumed - tdee;
    
    // 3500 calories = 1 pound = 0.45 kg
    const weightChange = (calorieBalance / 3500) * 0.45;
    const predictedWeight = personalData.weight + weightChange;
    
    const bmi = personalData.weight / Math.pow(personalData.height / 100, 2);
    const predictedBMI = predictedWeight / Math.pow(personalData.height / 100, 2);

    setPredictions({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      caloriesConsumed: totalCaloriesConsumed,
      calorieBalance: Math.round(calorieBalance),
      weightChange: Number(weightChange.toFixed(2)),
      predictedWeight: Number(predictedWeight.toFixed(1)),
      currentBMI: Number(bmi.toFixed(1)),
      predictedBMI: Number(predictedBMI.toFixed(1))
    });
  };

  useEffect(() => {
    calculatePredictions();
  }, [personalData, foodItems]);

  const steps = [
    { id: 1, title: '个人信息', icon: Activity, description: '输入基本身体数据' },
    { id: 2, title: '饮食记录', icon: Apple, description: '记录今日食物摄入' },
    { id: 3, title: '体重预测', icon: TrendingUp, description: '查看明日体重预测' },
    { id: 4, title: '饮食建议', icon: Target, description: '获取个性化建议' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-full">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
            智能健康预测系统
          </h1>
          <p className="text-gray-600 text-lg">
            基于饮食摄入量预测体重变化，获取个性化健康建议
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-white rounded-full p-2 shadow-lg">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    currentStep === step.id
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md'
                      : currentStep > step.id
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden md:block">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${currentStep > step.id ? 'bg-green-300' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <PersonalInfo
              data={personalData}
              onUpdate={setPersonalData}
              onNext={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 2 && (
            <FoodIntake
              items={foodItems}
              onUpdate={setFoodItems}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          
          {currentStep === 3 && predictions && (
            <Predictions
              predictions={predictions}
              personalData={personalData}
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 4 && predictions && (
            <DietaryAdvice
              predictions={predictions}
              personalData={personalData}
              onBack={() => setCurrentStep(3)}
              onRestart={() => {
                setCurrentStep(1);
                setFoodItems([]);
                setPredictions(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;