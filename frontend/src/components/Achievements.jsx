import React from 'react';
import { Trophy, Star, Award, Target, BarChart, Home, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Achievements = ({ achievements, user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
          >
            ← Back to Profile
          </button>
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 md:p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <Trophy size={40} className="text-white" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">My Achievements</h1>
                <p className="text-amber-100 mt-1">Track your learning progress and accomplishments</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{achievements.length}</div>
                <div className="text-sm opacity-90">Total Achievements</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{achievements.filter(a => a.icon === 'trophy').length}</div>
                <div className="text-sm opacity-90">Trophies</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{achievements.filter(a => a.icon === 'star').length}</div>
                <div className="text-sm opacity-90">Stars</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{achievements.filter(a => a.icon === 'award').length}</div>
                <div className="text-sm opacity-90">Awards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.length > 0 ? (
            achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white border-2 border-amber-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-amber-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full">
                    {achievement.icon === 'trophy' ? (
                      <Trophy size={24} className="text-white" />
                    ) : achievement.icon === 'star' ? (
                      <Star size={24} className="text-white" />
                    ) : (
                      <Award size={24} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-100">
                  <span className="text-sm text-amber-700">
                    Earned: {new Date(achievement.earned_at).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                    {achievement.points || 100} pts
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
              <Trophy size={48} className="text-amber-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-amber-800 mb-2">No Achievements Yet</h4>
              <p className="text-amber-700 mb-6 max-w-md mx-auto">
                Complete courses, submit assignments, and participate in activities to earn achievements
              </p>
              <button 
                onClick={() => navigate('/academy')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-md hover:shadow-amber-200 transition-all hover:scale-105"
              >
                <Sparkles size={18} />
                Start Earning Achievements
              </button>
            </div>
          )}
        </div>

        {/* Progress Section */}
        {achievements.length > 0 && (
          <div className="mt-12 bg-white border-2 border-emerald-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart size={20} className="text-emerald-600" />
              Achievement Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Overall Progress</span>
                  <span>{Math.round((achievements.length / 20) * 100)}%</span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${(achievements.length / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                You've earned {achievements.length} out of 20 possible achievements. Keep learning to unlock more!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;