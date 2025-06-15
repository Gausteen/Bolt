import React from 'react';
import { User, Ruler, Weight, Calendar, Activity } from 'lucide-react';
import { PersonalData } from '../App';

interface PersonalInfoProps {
  data: PersonalData;
  onUpdate: (data: PersonalData) => void;
  onNext: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, onUpdate, onNext }) => {
  const activityLevels = [
    { value: 1.2, label: '久坐不动', description: '办公室工作，很少运动' },
    { value: 1.375, label: '轻度活动', description: '轻度运动，每周1-3次' },
    { value: 1.55, label: '中度活动', description: '中度运动，每周3-5次' },
    { value: 1.725, label: '高度活动', description: '高强度运动，每周6-7次' },
    { value: 1.9, label: '极度活动', description: '体力工作或每日两次训练' }
  ];

  const isValid = data.height > 0 && data.weight > 0 && data.age > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">个人基本信息</h2>
        <p className="text-gray-600">请填写您的基本身体数据以获得准确预测</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Height */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Ruler className="w-4 h-4" />
            <span>身高 (cm)</span>
          </label>
          <input
            type="number"
            value={data.height || ''}
            onChange={(e) => onUpdate({ ...data, height: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="例: 170"
          />
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Weight className="w-4 h-4" />
            <span>体重 (kg)</span>
          </label>
          <input
            type="number"
            step="0.1"
            value={data.weight || ''}
            onChange={(e) => onUpdate({ ...data, weight: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="例: 65.5"
          />
        </div>

        {/* Age */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4" />
            <span>年龄</span>
          </label>
          <input
            type="number"
            value={data.age || ''}
            onChange={(e) => onUpdate({ ...data, age: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="例: 25"
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <User className="w-4 h-4" />
            <span>性别</span>
          </label>
          <select
            value={data.gender}
            onChange={(e) => onUpdate({ ...data, gender: e.target.value as 'male' | 'female' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>
      </div>

      {/* Activity Level */}
      <div className="mt-6 space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Activity className="w-4 h-4" />
          <span>活动水平</span>
        </label>
        <div className="grid gap-3">
          {activityLevels.map((level) => (
            <label
              key={level.value}
              className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                data.activityLevel === level.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="activityLevel"
                value={level.value}
                checked={data.activityLevel === level.value}
                onChange={(e) => onUpdate({ ...data, activityLevel: Number(e.target.value) })}
                className="text-blue-500"
              />
              <div>
                <div className="font-medium text-gray-800">{level.label}</div>
                <div className="text-sm text-gray-600">{level.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isValid
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          下一步 →
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;