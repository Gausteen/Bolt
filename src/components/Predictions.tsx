import React from 'react';
import { TrendingUp, TrendingDown, Activity, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { PersonalData } from '../App';

interface PredictionsProps {
  predictions: {
    bmr: number;
    tdee: number;
    caloriesConsumed: number;
    calorieBalance: number;
    weightChange: number;
    predictedWeight: number;
    currentBMI: number;
    predictedBMI: number;
  };
  personalData: PersonalData;
  onNext: () => void;
  onBack: () => void;
}

const Predictions: React.FC<PredictionsProps> = ({ predictions, personalData, onNext, onBack }) => {
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: '偏瘦', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (bmi < 24) return { category: '正常', color: 'text-green-600', bg: 'bg-green-100' };
    if (bmi < 28) return { category: '超重', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { category: '肥胖', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const currentBMIInfo = getBMICategory(predictions.currentBMI);
  const predictedBMIInfo = getBMICategory(predictions.predictedBMI);

  const getWeightTrend = () => {
    if (predictions.weightChange > 0.1) {
      return { icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-100', trend: '增加' };
    } else if (predictions.weightChange < -0.1) {
      return { icon: TrendingDown, color: 'text-green-500', bg: 'bg-green-100', trend: '减少' };
    } else {
      return { icon: Target, color: 'text-blue-500', bg: 'bg-blue-100', trend: '保持' };
    }
  };

  const weightTrendInfo = getWeightTrend();
  const WeightTrendIcon = weightTrendInfo.icon;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">明日体重预测</h2>
        <p className="text-gray-600">基于今日饮食摄入的科学预测</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Weight Prediction Card */}
        <div className={`${weightTrendInfo.bg} rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">体重变化</h3>
            <WeightTrendIcon className={`w-6 h-6 ${weightTrendInfo.color}`} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">当前体重:</span>
              <span className="font-medium">{personalData.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">预测体重:</span>
              <span className="font-bold text-lg">{predictions.predictedWeight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">变化量:</span>
              <span className={`font-medium ${weightTrendInfo.color}`}>
                {predictions.weightChange > 0 ? '+' : ''}{predictions.weightChange} kg
              </span>
            </div>
            <div className="text-sm text-gray-600 text-center mt-3">
              体重趋势: <span className={`font-medium ${weightTrendInfo.color}`}>{weightTrendInfo.trend}</span>
            </div>
          </div>
        </div>

        {/* BMI Comparison */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">BMI 指数</h3>
            <Activity className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">当前 BMI:</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{predictions.currentBMI}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${currentBMIInfo.bg} ${currentBMIInfo.color}`}>
                  {currentBMIInfo.category}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">预测 BMI:</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{predictions.predictedBMI}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${predictedBMIInfo.bg} ${predictedBMIInfo.color}`}>
                  {predictedBMIInfo.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calorie Analysis */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">热量分析</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">基础代谢率 (BMR):</span>
              <span className="font-medium">{predictions.bmr} 卡</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">每日消耗 (TDEE):</span>
              <span className="font-medium">{predictions.tdee} 卡</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">今日摄入:</span>
              <span className="font-medium">{predictions.caloriesConsumed} 卡</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">热量平衡:</span>
              <span className={`font-bold ${predictions.calorieBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {predictions.calorieBalance > 0 ? '+' : ''}{predictions.calorieBalance} 卡
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Health Alert */}
      <div className={`rounded-xl p-4 mb-6 ${
        Math.abs(predictions.calorieBalance) > 500 
          ? 'bg-yellow-50 border border-yellow-200' 
          : 'bg-green-50 border border-green-200'
      }`}>
        <div className="flex items-center space-x-3">
          {Math.abs(predictions.calorieBalance) > 500 ? (
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-600" />
          )}
          <div>
            <div className={`font-medium ${
              Math.abs(predictions.calorieBalance) > 500 ? 'text-yellow-800' : 'text-green-800'
            }`}>
              {Math.abs(predictions.calorieBalance) > 500 
                ? '热量失衡提醒' 
                : '热量平衡良好'
              }
            </div>
            <div className={`text-sm ${
              Math.abs(predictions.calorieBalance) > 500 ? 'text-yellow-700' : 'text-green-700'
            }`}>
              {Math.abs(predictions.calorieBalance) > 500 
                ? '今日热量摄入与消耗差距较大，建议调整饮食或增加运动' 
                : '今日热量摄入与消耗较为平衡，继续保持'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
        >
          ← 上一步
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
        >
          获取建议 →
        </button>
      </div>
    </div>
  );
};

export default Predictions;