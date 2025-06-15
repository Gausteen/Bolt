import React from 'react';
import { Target, Utensils, Activity, Heart, RefreshCw, CheckCircle } from 'lucide-react';
import { PersonalData } from '../App';

interface DietaryAdviceProps {
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
  onBack: () => void;
  onRestart: () => void;
}

const DietaryAdvice: React.FC<DietaryAdviceProps> = ({ predictions, personalData, onBack, onRestart }) => {
  const getWeightGoalAdvice = () => {
    const bmi = predictions.currentBMI;
    if (bmi < 18.5) {
      return {
        goal: '健康增重',
        targetCalories: predictions.tdee + 300,
        advice: '建议适量增加热量摄入，选择营养密度高的食物',
        color: 'bg-blue-500'
      };
    } else if (bmi > 24) {
      return {
        goal: '健康减重',
        targetCalories: predictions.tdee - 300,
        advice: '建议适量减少热量摄入，增加运动量',
        color: 'bg-green-500'
      };
    } else {
      return {
        goal: '维持体重',
        targetCalories: predictions.tdee,
        advice: '继续保持当前的饮食和运动习惯',
        color: 'bg-purple-500'
      };
    }
  };

  const weightGoal = getWeightGoalAdvice();

  const getFoodRecommendations = () => {
    const bmi = predictions.currentBMI;
    const calorieBalance = predictions.calorieBalance;

    if (bmi < 18.5 || calorieBalance < -500) {
      return {
        title: '增重建议食物',
        foods: [
          { name: '牛油果', benefit: '健康脂肪，高热量' },
          { name: '坚果类', benefit: '蛋白质和健康脂肪' },
          { name: '全麦面包', benefit: '复合碳水化合物' },
          { name: '鸡蛋', benefit: '优质蛋白质' },
          { name: '牛奶', benefit: '蛋白质和钙质' },
          { name: '香蕉', benefit: '天然糖分和钾' }
        ],
        avoid: ['过度加工食品', '含糖饮料', '油炸食品']
      };
    } else if (bmi > 24 || calorieBalance > 500) {
      return {
        title: '减重建议食物',
        foods: [
          { name: '绿叶蔬菜', benefit: '低热量，高纤维' },
          { name: '瘦肉', benefit: '优质蛋白质' },
          { name: '鱼类', benefit: 'Omega-3脂肪酸' },
          { name: '浆果类', benefit: '抗氧化剂，低糖' },
          { name: '燕麦', benefit: '饱腹感强' },
          { name: '希腊酸奶', benefit: '高蛋白，益生菌' }
        ],
        avoid: ['高糖食品', '精制碳水', '高脂肪零食']
      };
    } else {
      return {
        title: '均衡饮食建议',
        foods: [
          { name: '各色蔬菜', benefit: '维生素和矿物质' },
          { name: '全谷物', benefit: '复合碳水化合物' },
          { name: '瘦蛋白', benefit: '肌肉维护' },
          { name: '健康脂肪', benefit: '必需脂肪酸' },
          { name: '水果', benefit: '天然维生素' },
          { name: '充足水分', benefit: '身体代谢' }
        ],
        avoid: ['过量加工食品', '过多精制糖', '反式脂肪']
      };
    }
  };

  const getExerciseRecommendations = () => {
    const activityLevel = personalData.activityLevel;
    const bmi = predictions.currentBMI;

    if (activityLevel <= 1.375) {
      return {
        title: '增加活动建议',
        exercises: [
          '每日30分钟快走',
          '简单居家力量训练',
          '瑜伽或拉伸运动',
          '爬楼梯代替电梯'
        ]
      };
    } else if (bmi > 24) {
      return {
        title: '减重运动建议',
        exercises: [
          '有氧运动45-60分钟',
          '高强度间歇训练(HIIT)',
          '力量训练2-3次/周',
          '游泳或骑行'
        ]
      };
    } else {
      return {
        title: '维持健康运动',
        exercises: [
          '规律有氧运动',
          '力量训练维持肌肉',
          '柔韧性训练',
          '户外活动增加乐趣'
        ]
      };
    }
  };

  const foodRecs = getFoodRecommendations();
  const exerciseRecs = getExerciseRecommendations();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">个性化健康建议</h2>
        <p className="text-gray-600">基于您的身体状况和目标的专业建议</p>
      </div>

      {/* Weight Goal */}
      <div className={`${weightGoal.color} text-white rounded-xl p-6 mb-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{weightGoal.goal}</h3>
          <Target className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>建议每日热量:</span>
            <span className="font-bold">{Math.round(weightGoal.targetCalories)} 卡</span>
          </div>
          <div className="flex justify-between">
            <span>与今日摄入差距:</span>
            <span className="font-bold">
              {predictions.caloriesConsumed - weightGoal.targetCalories > 0 ? '+' : ''}
              {Math.round(predictions.caloriesConsumed - weightGoal.targetCalories)} 卡
            </span>
          </div>
          <p className="text-sm opacity-90 mt-3">{weightGoal.advice}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Food Recommendations */}
        <div className="bg-green-50 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Utensils className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">{foodRecs.title}</h3>
          </div>
          <div className="space-y-3 mb-4">
            {foodRecs.foods.map((food, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-800">{food.name}</div>
                  <div className="text-sm text-gray-600">{food.benefit}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-green-200 pt-3">
            <div className="text-sm font-medium text-gray-700 mb-2">建议避免:</div>
            <div className="text-sm text-gray-600">
              {foodRecs.avoid.join('、')}
            </div>
          </div>
        </div>

        {/* Exercise Recommendations */}
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">{exerciseRecs.title}</h3>
          </div>
          <div className="space-y-2">
            {exerciseRecs.exercises.map((exercise, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">{exercise}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Heart className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">健康小贴士</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="space-y-2">
            <div>• 保持规律的用餐时间</div>
            <div>• 细嚼慢咽，感受饱腹感</div>
            <div>• 餐前喝水增加饱腹感</div>
          </div>
          <div className="space-y-2">
            <div>• 保证充足的睡眠</div>
            <div>• 减少压力和情绪化进食</div>
            <div>• 记录饮食有助于自我监控</div>
          </div>
        </div>
      </div>

      {/* Tomorrow's Plan */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">明日行动计划</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">1</div>
            <span>目标热量摄入: {Math.round(weightGoal.targetCalories)} 卡</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">2</div>
            <span>增加推荐食物的摄入比例</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">3</div>
            <span>进行建议的运动类型</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">4</div>
            <span>记录全天饮食和体重变化</span>
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
          onClick={onRestart}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>重新开始</span>
        </button>
      </div>
    </div>
  );
};

export default DietaryAdvice;