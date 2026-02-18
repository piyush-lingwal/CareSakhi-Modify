import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Heart, AlertCircle, Plus, ChevronLeft, ChevronRight, Clock, Target, Zap, Bell, BookOpen, Activity, Brain, Droplets, Moon, Sun, CheckCircle, Star, Award } from 'lucide-react';

const PeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const [cycleData, setCycleData] = useState({
    lastPeriodDate: '',
    cycleLength: 28,
    periodLength: 5,
    symptoms: []
  });

  const [prediction, setPrediction] = useState(null);
  const [healthScore, setHealthScore] = useState(8.5);
  const [cycleRegularity, setCycleRegularity] = useState(85);
  const [moodData, setMoodData] = useState({
    current: 'happy',
    history: ['happy', 'calm', 'tired', 'happy', 'emotional', 'calm', 'happy']
  });
  const [hydrationLevel, setHydrationLevel] = useState(6);
  const [sleepQuality, setSleepQuality] = useState(7);
  const [showPrediction, setShowPrediction] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Symptom weightage for health score calculation
  const symptomWeights = {
    'Cramps': 0.8,
    'Headache': 0.6,
    'Mood Swings': 0.5,
    'Bloating': 0.4,
    'Fatigue': 0.7,
    'Breast Tenderness': 0.3,
    'Acne': 0.2,
    'Food Cravings': 0.7
  };

  const personalizedPlans = [
    {
      id: 'basic',
      name: 'Basic Wellness Plan',
      price: 'Free',
      features: [
        'Period tracking',
        'Basic predictions',
        'Symptom logging',
        'Monthly insights'
      ],
      color: 'from-blue-500 to-cyan-500',
      icon: Activity
    },
    {
      id: 'premium',
      name: 'Premium Health Plan',
      price: '₹299/month',
      features: [
        'Advanced cycle analysis',
        'Personalized recommendations',
        'Health score tracking',
        'Expert consultations',
        'Nutrition guidance'
      ],
      color: 'from-purple-500 to-pink-500',
      icon: Star,
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro Wellness Plan',
      price: '₹499/month',
      features: [
        'Complete health monitoring',
        'AI-powered insights',
        'Fertility tracking',
        '24/7 expert support',
        'Custom meal plans',
        'Workout recommendations'
      ],
      color: 'from-emerald-500 to-teal-500',
      icon: Award
    }
  ];

  // Enhanced health score calculation with symptom weights
  const calculateHealthScore = () => {
    let baseScore = 10;
    
    // Deduct points based on symptoms and their weights
    cycleData.symptoms.forEach(symptom => {
      const weight = symptomWeights[symptom] || 0.5;
      baseScore -= weight;
    });
    
    // Factor in hydration (0-2 points)
    const hydrationScore = (hydrationLevel / 10) * 2;
    baseScore = Math.min(10, baseScore + hydrationScore - 2);
    
    // Factor in sleep quality (0-2 points)
    const sleepScore = (sleepQuality / 10) * 2;
    baseScore = Math.min(10, baseScore + sleepScore - 2);
    
    // Ensure score doesn't go below 1
    const finalScore = Math.max(1, Math.min(10, baseScore));
    setHealthScore(Math.round(finalScore * 10) / 10);
    
    // Update cycle regularity based on data completeness
    const dataCompleteness = (
      (cycleData.lastPeriodDate ? 30 : 0) +
      (cycleData.symptoms.length > 0 ? 20 : 0) +
      (hydrationLevel > 5 ? 25 : 0) +
      (sleepQuality > 6 ? 25 : 0)
    );
    setCycleRegularity(Math.min(100, dataCompleteness));
  };

  useEffect(() => {
    calculateHealthScore();
  }, [cycleData, hydrationLevel, sleepQuality, moodData]);

  // Enhanced calendar functionality for 12-month predictions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const selectDate = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
    setCycleData(prev => ({
      ...prev,
      lastPeriodDate: selected.toISOString().split('T')[0]
    }));
  };

  // Enhanced prediction calculation for 12 months
  const calculatePredictionDays = () => {
    if (!cycleData.lastPeriodDate) return [];

    const lastDate = new Date(cycleData.lastPeriodDate);
    const cycleLength = parseInt(cycleData.cycleLength);
    const periodLength = parseInt(cycleData.periodLength);
    
    const days = [];
    
    // Generate predictions for 12 cycles (approximately 12 months)
    for (let cycle = 0; cycle < 12; cycle++) {
      const cycleStartDate = new Date(lastDate);
      cycleStartDate.setDate(lastDate.getDate() + (cycle * cycleLength));
      
      // Period days for this cycle
      for (let i = 0; i < periodLength; i++) {
        const day = new Date(cycleStartDate);
        day.setDate(cycleStartDate.getDate() + i);
        days.push({ 
          date: day, 
          type: cycle === 0 ? 'current-period' : 'future-period', 
          color: cycle === 0 ? 'bg-red-500' : 'bg-pink-400',
          cycle: cycle + 1
        });
      }
      
      // Pre-period days (3 days before)
      for (let i = 1; i <= 3; i++) {
        const day = new Date(cycleStartDate);
        day.setDate(cycleStartDate.getDate() - i);
        days.push({ 
          date: day, 
          type: 'pre-period', 
          color: 'bg-orange-300',
          cycle: cycle + 1
        });
      }
      
      // Post-period days (3 days after)
      for (let i = periodLength; i < periodLength + 3; i++) {
        const day = new Date(cycleStartDate);
        day.setDate(cycleStartDate.getDate() + i);
        days.push({ 
          date: day, 
          type: 'post-period', 
          color: 'bg-yellow-300',
          cycle: cycle + 1
        });
      }
      
      // Ovulation window (5 days around ovulation)
      const ovulationStart = cycleLength - 16;
      const ovulationEnd = cycleLength - 12;
      for (let i = ovulationStart; i <= ovulationEnd; i++) {
        const day = new Date(cycleStartDate);
        day.setDate(cycleStartDate.getDate() + i);
        days.push({ 
          date: day, 
          type: 'ovulation', 
          color: 'bg-green-400',
          cycle: cycle + 1
        });
      }
      
      // Peak ovulation day
      const peakOvulation = new Date(cycleStartDate);
      peakOvulation.setDate(cycleStartDate.getDate() + cycleLength - 14);
      days.push({ 
        date: peakOvulation, 
        type: 'peak-ovulation', 
        color: 'bg-emerald-500',
        cycle: cycle + 1
      });
    }
    
    return days;
  };

  const getDayType = (day) => {
    if (!showPrediction) return null;
    
    const predictionDays = calculatePredictionDays();
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    return predictionDays.find(pd => 
      pd.date.getDate() === day &&
      pd.date.getMonth() === currentDate.getMonth() &&
      pd.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 lg:h-12"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentDate.getMonth() && 
                     today.getFullYear() === currentDate.getFullYear();
      
      const isPeriodDay = cycleData.lastPeriodDate && 
                         new Date(cycleData.lastPeriodDate).getDate() === day &&
                         new Date(cycleData.lastPeriodDate).getMonth() === currentDate.getMonth();
      
      const isSelected = selectedDate && 
                        selectedDate.getDate() === day &&
                        selectedDate.getMonth() === currentDate.getMonth();
      
      const dayType = getDayType(day);
      
      days.push(
        <button
          key={day}
          onClick={() => selectDate(day)}
          className={`h-10 lg:h-12 w-10 lg:w-12 rounded-xl flex items-center justify-center text-xs lg:text-sm font-semibold transition-all duration-300 hover:scale-110 relative ${
            isSelected
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-110 ring-2 ring-pink-300'
              : isToday 
              ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md ring-2 ring-emerald-300' 
              : dayType
              ? `${dayType.color} text-white shadow-md hover:shadow-lg`
              : isPeriodDay
              ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-2 border-red-300 shadow-sm'
              : 'hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 hover:shadow-md'
          }`}
          title={dayType ? `${dayType.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - Cycle ${dayType.cycle}` : ''}
        >
          {day}
          {dayType && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-sm"></div>
          )}
        </button>
      );
    }
    
    return days;
  };

  const handlePredict = () => {
    if (!cycleData.lastPeriodDate) {
      alert('Please select your last period start date first');
      return;
    }
    
    setShowPrediction(true);
    calculatePrediction();
    
    // Recalculate health metrics
    calculateHealthScore();
  };

  const calculatePrediction = () => {
    const lastDate = new Date(cycleData.lastPeriodDate);
    const cycleLength = parseInt(cycleData.cycleLength);
    const periodLength = parseInt(cycleData.periodLength);
    
    const nextPeriod = new Date(lastDate);
    nextPeriod.setDate(lastDate.getDate() + cycleLength);

    const ovulation = new Date(lastDate);
    ovulation.setDate(lastDate.getDate() + cycleLength - 14);

    const today = new Date();
    const daysUntilNext = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));

    setPrediction({
      nextPeriod: nextPeriod.toDateString(),
      ovulation: ovulation.toDateString(),
      daysUntilNext
    });
  };

  const symptoms = [
    'Cramps', 'Headache', 'Mood Swings', 'Bloating', 
    'Fatigue', 'Breast Tenderness', 'Acne', 'Food Cravings'
  ];

  const moods = [
    { emoji: '😊', name: 'Happy', color: 'bg-yellow-100 text-yellow-700' },
    { emoji: '😢', name: 'Sad', color: 'bg-blue-100 text-blue-700' },
    { emoji: '😤', name: 'Irritated', color: 'bg-red-100 text-red-700' },
    { emoji: '😴', name: 'Tired', color: 'bg-purple-100 text-purple-700' },
    { emoji: '🤗', name: 'Emotional', color: 'bg-pink-100 text-pink-700' },
    { emoji: '😌', name: 'Calm', color: 'bg-green-100 text-green-700' }
  ];

  const handleInputChange = (e) => {
    setCycleData({
      ...cycleData,
      [e.target.name]: e.target.value
    });
  };

  const handleSymptomToggle = (symptom) => {
    setCycleData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Smart Period Tracker
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600">
              Track your cycle and get personalized predictions
            </p>
          </div>

          {/* Main Dashboard */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Calendar and Cycle Data */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-pink-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 flex items-center">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-pink-600" />
                  Cycle Calendar
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 lg:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                  </button>
                  <span className="text-sm lg:text-base font-medium text-gray-700 min-w-[120px] text-center">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 lg:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Cycle Input Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 lg:mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cycle Length (days)
                  </label>
                  <input
                    type="number"
                    name="cycleLength"
                    value={cycleData.cycleLength}
                    onChange={handleInputChange}
                    min="21"
                    max="35"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm lg:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Period Length (days)
                  </label>
                  <input
                    type="number"
                    name="periodLength"
                    value={cycleData.periodLength}
                    onChange={handleInputChange}
                    min="3"
                    max="8"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm lg:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Period Date
                  </label>
                  <input
                    type="date"
                    name="lastPeriodDate"
                    value={cycleData.lastPeriodDate}
                    onChange={handleInputChange}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm lg:text-base"
                  />
                </div>
              </div>

              {/* Enhanced Visual Calendar */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 lg:p-6 border-2 border-pink-200 mb-6">
                {/* Calendar Grid */}
                <div className="bg-white rounded-xl p-3 lg:p-4 shadow-lg">
                  <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="h-8 lg:h-10 flex items-center justify-center text-xs lg:text-sm font-semibold text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 lg:gap-2">
                    {renderCalendar()}
                  </div>
                  
                  {/* Enhanced Calendar Legend */}
                  {showPrediction && (
                    <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Current Period</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-pink-400 rounded-full shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Future Periods</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-orange-300 rounded-full shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Pre-Period</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-yellow-300 rounded-full shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Post-Period</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Ovulation Window</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-emerald-500 rounded-full shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Peak Ovulation</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Symptoms Tracking */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Current Symptoms
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                  {symptoms.map(symptom => (
                    <button
                      key={symptom}
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`p-2 lg:p-3 rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        cycleData.symptoms.includes(symptom)
                          ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-2 border-pink-300 shadow-lg scale-105'
                          : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:border-pink-200 hover:shadow-md'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Predict Button - Repositioned after symptoms */}
              <div className="text-center">
                <button
                  onClick={handlePredict}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
                >
                  Generate 12-Month Predictions
                </button>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-4 lg:space-y-6">
              {/* Dynamic Health Score */}
              <div className="bg-white rounded-3xl shadow-2xl p-4 lg:p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-pink-600" />
                  Health Score
                </h3>
                
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <svg className="w-20 h-20 lg:w-24 lg:h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#healthGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${healthScore * 25.12} 251.2`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xl lg:text-2xl font-bold text-gray-800">{healthScore}</div>
                    </div>
                  </div>
                  
                  <div className={`text-sm font-medium mt-2 ${
                    healthScore >= 8 ? 'text-green-600' : 
                    healthScore >= 6 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {healthScore >= 8 ? 'Excellent Health' : healthScore >= 6 ? 'Good Health' : 'Needs Attention'}
                  </div>
                </div>

                {/* Enhanced Health Factors */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Cycle Regularity</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-1000" 
                        style={{width: `${cycleRegularity}%`}}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-pink-600">{cycleRegularity}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Symptom Impact</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000" 
                        style={{width: `${Math.max(20, 100 - (cycleData.symptoms.length * 12))}%`}}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-blue-600">{Math.max(20, 100 - (cycleData.symptoms.length * 12))}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Overall Wellness</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000" 
                        style={{width: `${Math.min(100, (hydrationLevel * 5) + (sleepQuality * 5))}%`}}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-emerald-600">{Math.min(100, (hydrationLevel * 5) + (sleepQuality * 5))}%</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Mood Tracker */}
              <div className="bg-white rounded-3xl shadow-2xl p-4 lg:p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-pink-600" />
                  Today's Mood
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-3 mb-4">
                  {moods.map(mood => (
                    <button
                      key={mood.name}
                      onClick={() => setMoodData(prev => ({...prev, current: mood.name.toLowerCase()}))}
                      className={`p-2 lg:p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-md ${
                        moodData.current === mood.name.toLowerCase() 
                          ? `${mood.color} ring-2 ring-pink-400 scale-105 shadow-lg` 
                          : mood.color
                      }`}
                    >
                      <div className="text-lg lg:text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs font-medium">{mood.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Wellness Tracker */}
              <div className="bg-white rounded-3xl shadow-2xl p-4 lg:p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-blue-600" />
                  Daily Wellness
                </h3>
                
                {/* Hydration Tracker */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Hydration</span>
                    <span className="text-sm font-medium text-blue-600">{hydrationLevel}/10 glasses</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(10)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHydrationLevel(i + 1)}
                        className={`w-4 h-6 lg:w-6 lg:h-8 rounded-lg transition-all duration-300 hover:scale-110 ${
                          i < hydrationLevel 
                            ? 'bg-gradient-to-t from-blue-400 to-blue-500 shadow-md' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Sleep Quality */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Sleep Quality</span>
                    <span className="text-sm font-medium text-purple-600">{sleepQuality}/10</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(10)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSleepQuality(i + 1)}
                        className={`w-4 h-4 lg:w-6 lg:h-6 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center ${
                          i < sleepQuality 
                            ? 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-md' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {i < sleepQuality && (
                          i < 5 ? <Moon className="w-2 h-2 lg:w-3 lg:h-3 text-white" /> : <Sun className="w-2 h-2 lg:w-3 lg:h-3 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Cycle Insights - Updates when predict is clicked */}
          {showPrediction && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-pink-100 mb-8 animate-fade-in">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-pink-600" />
                Cycle Insights & Predictions
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Cycle Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Regularity Score</span>
                      <span className="font-bold text-pink-600">{cycleRegularity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cycle Length</span>
                      <span className="font-bold text-purple-600">{cycleData.cycleLength} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Period Length</span>
                      <span className="font-bold text-blue-600">{cycleData.periodLength} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Symptoms</span>
                      <span className="font-bold text-orange-600">{cycleData.symptoms.length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Health Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall Health</span>
                      <span className={`font-bold ${
                        healthScore >= 8 ? 'text-green-600' : 
                        healthScore >= 6 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {healthScore}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hydration Level</span>
                      <span className="font-bold text-blue-600">{hydrationLevel}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sleep Quality</span>
                      <span className="font-bold text-purple-600">{sleepQuality}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mood Stability</span>
                      <span className="font-bold text-emerald-600">
                        {cycleData.symptoms.includes('Mood Swings') ? 'Moderate' : 'Good'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Next Predictions</h4>
                  {prediction && (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Period</span>
                        <span className="font-bold text-red-600">
                          {prediction.daysUntilNext > 0 ? `${prediction.daysUntilNext} days` : 'Today'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ovulation</span>
                        <span className="font-bold text-green-600">
                          {Math.max(0, prediction.daysUntilNext - 14)} days
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fertile Window</span>
                        <span className="font-bold text-emerald-600">
                          {Math.max(0, prediction.daysUntilNext - 16)} - {Math.max(0, prediction.daysUntilNext - 12)} days
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Personalized Plans */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-pink-100">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 lg:mb-8 text-center">Choose Your Personalized Plan</h2>
            
            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {personalizedPlans.map(plan => {
                const IconComponent = plan.icon;
                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 cursor-pointer ${
                      selectedPlan === plan.id
                        ? 'border-pink-500 shadow-pink-100 scale-105'
                        : 'border-gray-100 hover:border-pink-200'
                    } ${plan.popular ? 'ring-2 ring-pink-500 ring-opacity-50' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 lg:-top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-bold shadow-lg">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="p-4 lg:p-6">
                      <div className="text-center mb-4 lg:mb-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${plan.color} rounded-full mb-3 lg:mb-4 shadow-lg`}>
                          <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">{plan.name}</h4>
                        <div className="text-xl lg:text-2xl font-bold text-gray-800">{plan.price}</div>
                      </div>

                      <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600 text-sm lg:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        className={`w-full py-2 lg:py-3 px-4 lg:px-6 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base ${
                          selectedPlan === plan.id
                            ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                            : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white'
                        }`}
                      >
                        {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedPlan && (
              <div className="mt-6 lg:mt-8 text-center animate-fade-in">
                <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Activate {personalizedPlans.find(p => p.id === selectedPlan)?.name}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;
