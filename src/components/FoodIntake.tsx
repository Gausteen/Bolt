import React, { useState } from 'react';
import { Plus, Trash2, Apple, Search, ChevronDown, ChevronUp, Utensils, Coffee, Cookie } from 'lucide-react';
import { FoodItem } from '../App';

interface FoodIntakeProps {
  items: FoodItem[];
  onUpdate: (items: FoodItem[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const FoodIntake: React.FC<FoodIntakeProps> = ({ items, onUpdate, onNext, onBack }) => {
  const [newFood, setNewFood] = useState({ name: '', calories: 0, quantity: 1, unit: '份' });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['staples']);

  const foodCategories = {
    staples: {
      name: '🍚 主食类',
      icon: '🍚',
      color: 'from-amber-400 to-orange-500',
      foods: [
        { name: '白米饭', calories: 116, unit: '碗', defaultQty: 1, image: '🍚' },
        { name: '糙米饭', calories: 100, unit: '碗', defaultQty: 1, image: '🍚' },
        { name: '白面条', calories: 138, unit: '碗', defaultQty: 1, image: '🍜' },
        { name: '全麦面条', calories: 124, unit: '碗', defaultQty: 1, image: '🍜' },
        { name: '白馒头', calories: 223, unit: '个', defaultQty: 1, image: '🥟' },
        { name: '全麦馒头', calories: 208, unit: '个', defaultQty: 1, image: '🥟' },
        { name: '白面包', calories: 80, unit: '片', defaultQty: 2, image: '🍞' },
        { name: '全麦面包', calories: 74, unit: '片', defaultQty: 2, image: '🍞' },
        { name: '小笼包', calories: 47, unit: '个', defaultQty: 6, image: '🥟' },
        { name: '煎饺', calories: 33, unit: '个', defaultQty: 8, image: '🥟' },
        { name: '水饺', calories: 25, unit: '个', defaultQty: 10, image: '🥟' },
        { name: '烧饼', calories: 163, unit: '个', defaultQty: 1, image: '🥯' },
        { name: '油条', calories: 193, unit: '根', defaultQty: 1, image: '🥖' },
        { name: '煎饼果子', calories: 255, unit: '个', defaultQty: 1, image: '🥞' },
        { name: '白粥', calories: 46, unit: '碗', defaultQty: 1, image: '🍲' },
        { name: '小米粥', calories: 46, unit: '碗', defaultQty: 1, image: '🍲' },
        { name: '燕麦粥', calories: 68, unit: '碗', defaultQty: 1, image: '🥣' }
      ]
    },
    meat: {
      name: '🥩 肉蛋类',
      icon: '🥩',
      color: 'from-red-400 to-pink-500',
      foods: [
        { name: '猪肉丝', calories: 143, unit: '份', defaultQty: 1, image: '🥩' },
        { name: '五花肉', calories: 518, unit: '份', defaultQty: 0.5, image: '🥓' },
        { name: '牛肉丝', calories: 125, unit: '份', defaultQty: 1, image: '🥩' },
        { name: '羊肉片', calories: 203, unit: '份', defaultQty: 1, image: '🥩' },
        { name: '鸡胸肉', calories: 133, unit: '份', defaultQty: 1, image: '🍗' },
        { name: '鸡腿肉', calories: 181, unit: '份', defaultQty: 1, image: '🍗' },
        { name: '烤鸭', calories: 240, unit: '份', defaultQty: 1, image: '🦆' },
        { name: '带鱼', calories: 127, unit: '份', defaultQty: 1, image: '🐟' },
        { name: '三文鱼', calories: 208, unit: '份', defaultQty: 1, image: '🐟' },
        { name: '虾仁', calories: 87, unit: '份', defaultQty: 1, image: '🦐' },
        { name: '螃蟹', calories: 95, unit: '只', defaultQty: 1, image: '🦀' },
        { name: '鸡蛋', calories: 70, unit: '个', defaultQty: 2, image: '🥚' },
        { name: '鸭蛋', calories: 185, unit: '个', defaultQty: 1, image: '🥚' },
        { name: '咸鸭蛋', calories: 190, unit: '个', defaultQty: 1, image: '🥚' }
      ]
    },
    vegetables: {
      name: '🥬 蔬菜类',
      icon: '🥬',
      color: 'from-green-400 to-emerald-500',
      foods: [
        { name: '白菜', calories: 17, unit: '份', defaultQty: 1, image: '🥬' },
        { name: '菠菜', calories: 28, unit: '份', defaultQty: 1, image: '🥬' },
        { name: '韭菜', calories: 26, unit: '份', defaultQty: 1, image: '🥬' },
        { name: '芹菜', calories: 20, unit: '份', defaultQty: 1, image: '🥬' },
        { name: '西兰花', calories: 34, unit: '份', defaultQty: 1, image: '🥦' },
        { name: '花菜', calories: 24, unit: '份', defaultQty: 1, image: '🥦' },
        { name: '胡萝卜', calories: 41, unit: '份', defaultQty: 1, image: '🥕' },
        { name: '土豆', calories: 77, unit: '个', defaultQty: 1, image: '🥔' },
        { name: '红薯', calories: 99, unit: '个', defaultQty: 1, image: '🍠' },
        { name: '冬瓜', calories: 11, unit: '份', defaultQty: 1, image: '🥒' },
        { name: '黄瓜', calories: 15, unit: '根', defaultQty: 1, image: '🥒' },
        { name: '西红柿', calories: 19, unit: '个', defaultQty: 1, image: '🍅' },
        { name: '茄子', calories: 21, unit: '个', defaultQty: 0.5, image: '🍆' },
        { name: '青椒', calories: 22, unit: '个', defaultQty: 1, image: '🫑' },
        { name: '豆角', calories: 30, unit: '份', defaultQty: 1, image: '🫘' },
        { name: '豆芽', calories: 18, unit: '份', defaultQty: 1, image: '🌱' },
        { name: '莲藕', calories: 70, unit: '份', defaultQty: 1, image: '🪷' },
        { name: '山药', calories: 56, unit: '份', defaultQty: 1, image: '🥔' }
      ]
    },
    fruits: {
      name: '🍎 水果类',
      icon: '🍎',
      color: 'from-pink-400 to-rose-500',
      foods: [
        { name: '苹果', calories: 52, unit: '个', defaultQty: 1, image: '🍎' },
        { name: '香蕉', calories: 89, unit: '根', defaultQty: 1, image: '🍌' },
        { name: '橙子', calories: 47, unit: '个', defaultQty: 1, image: '🍊' },
        { name: '梨', calories: 44, unit: '个', defaultQty: 1, image: '🍐' },
        { name: '葡萄', calories: 69, unit: '串', defaultQty: 0.5, image: '🍇' },
        { name: '西瓜', calories: 25, unit: '块', defaultQty: 2, image: '🍉' },
        { name: '哈密瓜', calories: 34, unit: '块', defaultQty: 2, image: '🍈' },
        { name: '桃子', calories: 51, unit: '个', defaultQty: 1, image: '🍑' },
        { name: '李子', calories: 28, unit: '个', defaultQty: 2, image: '🍇' },
        { name: '樱桃', calories: 46, unit: '颗', defaultQty: 10, image: '🍒' },
        { name: '草莓', calories: 30, unit: '颗', defaultQty: 5, image: '🍓' },
        { name: '蓝莓', calories: 57, unit: '盒', defaultQty: 0.5, image: '🫐' },
        { name: '猕猴桃', calories: 56, unit: '个', defaultQty: 1, image: '🥝' },
        { name: '芒果', calories: 67, unit: '个', defaultQty: 1, image: '🥭' },
        { name: '菠萝', calories: 41, unit: '块', defaultQty: 3, image: '🍍' },
        { name: '荔枝', calories: 70, unit: '颗', defaultQty: 8, image: '🍇' },
        { name: '龙眼', calories: 71, unit: '颗', defaultQty: 10, image: '🍇' }
      ]
    },
    dairy: {
      name: '🥛 奶豆类',
      icon: '🥛',
      color: 'from-blue-400 to-cyan-500',
      foods: [
        { name: '牛奶', calories: 126, unit: '杯', defaultQty: 1, image: '🥛' },
        { name: '酸奶', calories: 118, unit: '杯', defaultQty: 1, image: '🥛' },
        { name: '希腊酸奶', calories: 97, unit: '杯', defaultQty: 1, image: '🥛' },
        { name: '奶酪', calories: 113, unit: '片', defaultQty: 1, image: '🧀' },
        { name: '豆浆', calories: 42, unit: '杯', defaultQty: 1, image: '🥛' },
        { name: '豆腐', calories: 81, unit: '块', defaultQty: 1, image: '🧈' },
        { name: '豆腐干', calories: 140, unit: '块', defaultQty: 2, image: '🧈' },
        { name: '腐竹', calories: 459, unit: '份', defaultQty: 0.2, image: '🧈' }
      ]
    },
    nuts: {
      name: '🥜 坚果类',
      icon: '🥜',
      color: 'from-yellow-400 to-amber-500',
      foods: [
        { name: '花生', calories: 567, unit: '把', defaultQty: 0.2, image: '🥜' },
        { name: '核桃', calories: 654, unit: '个', defaultQty: 3, image: '🌰' },
        { name: '杏仁', calories: 579, unit: '把', defaultQty: 0.2, image: '🥜' },
        { name: '腰果', calories: 553, unit: '把', defaultQty: 0.2, image: '🥜' },
        { name: '开心果', calories: 557, unit: '把', defaultQty: 0.2, image: '🥜' },
        { name: '松子', calories: 698, unit: '把', defaultQty: 0.1, image: '🌰' },
        { name: '瓜子', calories: 606, unit: '把', defaultQty: 0.2, image: '🥜' },
        { name: '芝麻', calories: 565, unit: '勺', defaultQty: 1, image: '🥜' }
      ]
    },
    dishes: {
      name: '🍳 炒菜类',
      icon: '🍳',
      color: 'from-orange-400 to-red-500',
      foods: [
        { name: '宫保鸡丁', calories: 195, unit: '份', defaultQty: 1, image: '🍗' },
        { name: '麻婆豆腐', calories: 164, unit: '份', defaultQty: 1, image: '🧈' },
        { name: '红烧肉', calories: 439, unit: '份', defaultQty: 1, image: '🥩' },
        { name: '糖醋里脊', calories: 306, unit: '份', defaultQty: 1, image: '🥩' },
        { name: '鱼香肉丝', calories: 174, unit: '份', defaultQty: 1, image: '🥩' },
        { name: '回锅肉', calories: 274, unit: '份', defaultQty: 1, image: '🥩' },
        { name: '青椒肉丝', calories: 131, unit: '份', defaultQty: 1, image: '🫑' },
        { name: '西红柿鸡蛋', calories: 107, unit: '份', defaultQty: 1, image: '🍅' },
        { name: '醋溜土豆丝', calories: 81, unit: '份', defaultQty: 1, image: '🥔' },
        { name: '蒸蛋羹', calories: 62, unit: '份', defaultQty: 1, image: '🥚' },
        { name: '白切鸡', calories: 167, unit: '份', defaultQty: 1, image: '🍗' },
        { name: '清蒸鱼', calories: 112, unit: '份', defaultQty: 1, image: '🐟' },
        { name: '红烧茄子', calories: 127, unit: '份', defaultQty: 1, image: '🍆' },
        { name: '干煸豆角', calories: 88, unit: '份', defaultQty: 1, image: '🫘' },
        { name: '蚂蚁上树', calories: 156, unit: '份', defaultQty: 1, image: '🍜' },
        { name: '水煮鱼', calories: 198, unit: '份', defaultQty: 1, image: '🐟' },
        { name: '口水鸡', calories: 187, unit: '份', defaultQty: 1, image: '🍗' },
        { name: '麻辣香锅', calories: 245, unit: '份', defaultQty: 1, image: '🍲' },
        { name: '地三鲜', calories: 156, unit: '份', defaultQty: 1, image: '🍆' },
        { name: '锅包肉', calories: 298, unit: '份', defaultQty: 1, image: '🥩' }
      ]
    },
    snacks: {
      name: '🍪 零食类',
      icon: '🍪',
      color: 'from-purple-400 to-pink-500',
      foods: [
        { name: '薯片', calories: 547, unit: '包', defaultQty: 0.5, image: '🍟' },
        { name: '爆米花', calories: 387, unit: '包', defaultQty: 0.5, image: '🍿' },
        { name: '饼干', calories: 433, unit: '块', defaultQty: 3, image: '🍪' },
        { name: '蛋糕', calories: 347, unit: '块', defaultQty: 1, image: '🍰' },
        { name: '巧克力', calories: 546, unit: '块', defaultQty: 0.2, image: '🍫' },
        { name: '冰淇淋', calories: 207, unit: '球', defaultQty: 1, image: '🍦' },
        { name: '月饼', calories: 421, unit: '个', defaultQty: 0.5, image: '🥮' },
        { name: '粽子', calories: 195, unit: '个', defaultQty: 1, image: '🍙' },
        { name: '汤圆', calories: 311, unit: '个', defaultQty: 3, image: '🍡' },
        { name: '年糕', calories: 154, unit: '片', defaultQty: 2, image: '🍘' }
      ]
    },
    beverages: {
      name: '🥤 饮品类',
      icon: '🥤',
      color: 'from-cyan-400 to-blue-500',
      foods: [
        { name: '白开水', calories: 0, unit: '杯', defaultQty: 1, image: '💧' },
        { name: '绿茶', calories: 1, unit: '杯', defaultQty: 1, image: '🍵' },
        { name: '红茶', calories: 1, unit: '杯', defaultQty: 1, image: '🍵' },
        { name: '咖啡(无糖)', calories: 1, unit: '杯', defaultQty: 1, image: '☕' },
        { name: '咖啡(加糖)', calories: 87, unit: '杯', defaultQty: 1, image: '☕' },
        { name: '可乐', calories: 129, unit: '瓶', defaultQty: 1, image: '🥤' },
        { name: '雪碧', calories: 114, unit: '瓶', defaultQty: 1, image: '🥤' },
        { name: '橙汁', calories: 135, unit: '杯', defaultQty: 1, image: '🧃' },
        { name: '苹果汁', calories: 138, unit: '杯', defaultQty: 1, image: '🧃' },
        { name: '奶茶', calories: 261, unit: '杯', defaultQty: 1, image: '🧋' },
        { name: '啤酒', calories: 96, unit: '瓶', defaultQty: 1, image: '🍺' },
        { name: '红酒', calories: 125, unit: '杯', defaultQty: 1, image: '🍷' }
      ]
    }
  };

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryKey) 
        ? prev.filter(key => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const getFilteredFoods = (categoryKey: string) => {
    const category = foodCategories[categoryKey as keyof typeof foodCategories];
    if (!category) return [];
    
    let foods = category.foods;
    if (searchTerm) {
      foods = foods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return foods;
  };

  const addFood = (food?: any) => {
    const foodToAdd = food || newFood;
    if (foodToAdd.name && foodToAdd.calories > 0) {
      const quantity = food ? food.defaultQty : newFood.quantity;
      const newItem: FoodItem = {
        id: Date.now().toString(),
        name: foodToAdd.name,
        calories: foodToAdd.calories,
        quantity: quantity
      };
      onUpdate([...items, newItem]);
      setNewFood({ name: '', calories: 0, quantity: 1, unit: '份' });
    }
  };

  const removeFood = (id: string) => {
    onUpdate(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    onUpdate(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0.1, quantity) } : item
    ));
  };

  const totalCalories = items.reduce((sum, item) => sum + (item.calories * item.quantity), 0);

  return (
    <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
          <Apple className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
          今日饮食记录
        </h2>
        <p className="text-gray-600 text-lg">记录您今天摄入的所有美食 🍽️</p>
      </div>

      {/* Add Custom Food */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/50 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-orange-500" />
          添加自定义食物
        </h3>
        <div className="grid md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="食物名称"
            value={newFood.name}
            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
          />
          <input
            type="number"
            placeholder="热量/单位"
            value={newFood.calories || ''}
            onChange={(e) => setNewFood({ ...newFood, calories: Number(e.target.value) })}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
          />
          <input
            type="text"
            placeholder="单位"
            value={newFood.unit}
            onChange={(e) => setNewFood({ ...newFood, unit: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
          />
          <input
            type="number"
            step="0.1"
            placeholder="数量"
            value={newFood.quantity}
            onChange={(e) => setNewFood({ ...newFood, quantity: Number(e.target.value) })}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
          />
          <button
            onClick={() => addFood()}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            添加
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="🔍 搜索美食..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-lg shadow-lg"
          />
        </div>
      </div>

      {/* Food Categories */}
      <div className="space-y-4 mb-6">
        {Object.entries(foodCategories).map(([categoryKey, category]) => {
          const isExpanded = expandedCategories.includes(categoryKey);
          const filteredFoods = getFilteredFoods(categoryKey);
          
          if (searchTerm && filteredFoods.length === 0) return null;
          
          return (
            <div key={categoryKey} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden">
              <button
                onClick={() => toggleCategory(categoryKey)}
                className={`w-full p-4 text-left flex items-center justify-between bg-gradient-to-r ${category.color} text-white hover:opacity-90 transition-all`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-semibold text-lg">{category.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                    {filteredFoods.length} 种
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {isExpanded && (
                <div className="p-4">
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredFoods.map((food, index) => (
                      <button
                        key={`${food.name}-${index}`}
                        onClick={() => addFood(food)}
                        className="text-left p-4 border border-gray-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all group bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-105"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">{food.image}</span>
                          <div className="font-medium text-gray-800 group-hover:text-orange-700">
                            {food.name}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {food.calories}卡/{food.unit}
                        </div>
                        <div className="text-xs text-orange-600 font-medium">
                          建议: {food.defaultQty} {food.unit}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Added Foods */}
      {items.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Utensils className="w-5 h-5 mr-2 text-orange-500" />
            已添加食物
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50">
                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-lg">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    {item.calories}卡/单位 × {item.quantity} = 
                    <span className="font-bold text-orange-600 ml-1">
                      {Math.round(item.calories * item.quantity)}卡
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center bg-white/90 focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={() => removeFood(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total Calories */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-xl p-6 mb-6 shadow-xl">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{Math.round(totalCalories)} 卡</div>
          <div className="text-orange-100 text-lg flex items-center justify-center">
            <Coffee className="w-5 h-5 mr-2" />
            今日总热量摄入
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          ← 上一步
        </button>
        <button
          onClick={onNext}
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
        >
          查看预测 
          <Cookie className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default FoodIntake;