import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ExamEngine = ({ courseId, questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (option) => {
    setAnswers({ ...answers, [currentStep]: option });
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) setCurrentStep(currentStep + 1);
    else submitExam();
  };

  const submitExam = async () => {
    setIsSubmitting(true);
    // Logic: Calculate score (e.g., 4/5 correct)
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct_answer) correct++;
    });
    const finalScore = (correct / questions.length) * 100;

    try {
      await axios.post(`http://127.0.0.1:8000/api/courses/${courseId}/submit-exam`, {
        score: finalScore
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onComplete(finalScore);
    } catch (err) {
      alert("Error submitting exam. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900 p-8 rounded-3xl border border-apex-purple max-w-2xl mx-auto shadow-2xl">
      <div className="flex justify-between mb-8">
        <span className="text-apex-cyan font-mono">Question {currentStep + 1}/{questions.length}</span>
        <div className="w-1/2 bg-slate-800 h-2 rounded-full mt-2">
          <div 
            className="bg-apex-cyan h-full rounded-full transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">{questions[currentStep].question}</h2>
          <div className="space-y-4">
            {questions[currentStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  answers[currentStep] === opt 
                  ? 'border-apex-cyan bg-apex-cyan/10 text-apex-cyan' 
                  : 'border-slate-700 hover:border-apex-purple text-gray-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={nextStep}
        disabled={!answers[currentStep] || isSubmitting}
        className="w-full mt-10 bg-gradient-to-r from-apex-cyan to-apex-purple py-4 rounded-xl text-apex-navy font-black disabled:opacity-50"
      >
        {currentStep === questions.length - 1 ? (isSubmitting ? 'Processing...' : 'Finish Exam') : 'Next Question →'}
      </button>
    </div>
  );
};

export default ExamEngine;