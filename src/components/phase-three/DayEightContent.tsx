
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ActivitySquare, 
  Lightbulb, 
  Gauge, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Minus,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { 
  getProgressSummary, 
  getDirectionColor,
  getPSFSInterpretation 
} from "@/utils/progressCalculation";

interface DayEightContentProps {
  allCompleted: boolean;
  questionnaireResults: Record<string, any>;
}

const DayEightContent: React.FC<DayEightContentProps> = ({
  allCompleted,
  questionnaireResults
}) => {
  console.log("DayEightContent - allCompleted:", allCompleted);
  console.log("DayEightContent - questionnaireResults:", questionnaireResults);

  const progress = useMemo(() => getProgressSummary(), [questionnaireResults]);
  
  console.log("DayEightContent - Progress Summary:", progress);

  if (!allCompleted) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Progress Review</h3>
        <p>
          Please complete all the required assessments to view your progress feedback.
        </p>
        <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Assessments Incomplete</h4>
              <p className="text-amber-700">
                You need to complete all assessments before you can view your progress feedback.
                Return to previous days to complete any remaining questionnaires.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'improved':
        return <TrendingDown className="h-5 w-5 text-emerald-600" />;
      case 'worsened':
        return <TrendingUp className="h-5 w-5 text-rose-600" />;
      default:
        return <Minus className="h-5 w-5 text-amber-600" />;
    }
  };

  const formatPercentage = (value: number | null, direction: string) => {
    if (value === null) return "N/A";
    const prefix = direction === 'improved' ? '-' : '+';
    return `${prefix}${Math.round(value)}%`;
  };
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100">
        <h3 className="font-semibold text-xl text-indigo-900 mb-2">Your Recovery Journey Summary</h3>
        <p className="text-indigo-800 mb-4">
          Congratulations on completing the 3-month headache management program! Here's how your scores have changed from Phase 1 to Phase 3.
        </p>
        
        {/* Summary Cards - Real Data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* HIT-6 Summary Card */}
          {progress.hit6 && progress.hit6.percentageChange !== null && (
            <div className={`rounded-lg p-4 shadow-sm border ${getDirectionColor(progress.hit6.direction).bg} ${getDirectionColor(progress.hit6.direction).border}`}>
              <div className="flex items-center mb-2">
                {getDirectionIcon(progress.hit6.direction)}
                <h4 className="font-medium text-neutral-900 ml-2">Headache Impact</h4>
              </div>
              <p className={`text-3xl font-bold ${getDirectionColor(progress.hit6.direction).text}`}>
                {formatPercentage(progress.hit6.percentageChange, progress.hit6.direction)}
              </p>
              <p className="text-sm text-neutral-600">
                {progress.hit6.direction === 'improved' ? 'Reduction' : 'Change'} in impact score
              </p>
            </div>
          )}
          
          {/* MIDAS Summary Card */}
          {progress.midas && progress.midas.percentageChange !== null && (
            <div className={`rounded-lg p-4 shadow-sm border ${getDirectionColor(progress.midas.direction).bg} ${getDirectionColor(progress.midas.direction).border}`}>
              <div className="flex items-center mb-2">
                {getDirectionIcon(progress.midas.direction)}
                <h4 className="font-medium text-neutral-900 ml-2">Disability Days</h4>
              </div>
              <p className={`text-3xl font-bold ${getDirectionColor(progress.midas.direction).text}`}>
                {formatPercentage(progress.midas.percentageChange, progress.midas.direction)}
              </p>
              <p className="text-sm text-neutral-600">
                {progress.midas.direction === 'improved' ? 'Reduction' : 'Change'} in disability
              </p>
            </div>
          )}
          
          {/* PSFS Summary Card */}
          {progress.psfs && progress.psfs.percentageChange !== null && (
            <div className={`rounded-lg p-4 shadow-sm border ${getDirectionColor(progress.psfs.direction).bg} ${getDirectionColor(progress.psfs.direction).border}`}>
              <div className="flex items-center mb-2">
                {progress.psfs.direction === 'improved' ? 
                  <TrendingUp className="h-5 w-5 text-emerald-600" /> : 
                  <TrendingDown className="h-5 w-5 text-rose-600" />}
                <h4 className="font-medium text-neutral-900 ml-2">Functional Ability</h4>
              </div>
              <p className={`text-3xl font-bold ${getDirectionColor(progress.psfs.direction).text}`}>
                +{Math.round(progress.psfs.percentageChange || 0)}%
              </p>
              <p className="text-sm text-neutral-600">
                {progress.psfs.direction === 'improved' ? 'Improvement' : 'Change'} in activities
              </p>
            </div>
          )}
        </div>

        {/* Show message if no baseline comparison available */}
        {!progress.hasBaselineData && (
          <div className="bg-white/50 p-4 rounded-md mt-4">
            <p className="text-indigo-700 text-sm">
              <strong>Note:</strong> Phase 1 baseline data not found. The scores shown reflect your current Phase 3 assessments only.
            </p>
          </div>
        )}
      </div>
      
      {/* Detailed Outcome Section */}
      <div className="mb-8">
        <h3 className="font-medium text-lg mb-4">Detailed Comparison</h3>
        <div className="space-y-5">
          
          {/* HIT-6 Detailed Card */}
          {progress.hit6 && (
            <div className={`rounded-lg border p-5 ${getDirectionColor(progress.hit6.direction).bg} ${getDirectionColor(progress.hit6.direction).border}`}>
              <div className="flex items-start">
                <div className="mr-4">
                  <Gauge className="h-8 w-8 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium text-lg mb-2 ${getDirectionColor(progress.hit6.direction).text}`}>
                    Headache Impact Test (HIT-6)
                  </h3>
                  
                  {progress.hit6.baseline !== null && progress.hit6.followUp !== null ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/60 rounded p-3">
                          <p className="text-xs text-neutral-500 uppercase tracking-wide">Phase 1 (Baseline)</p>
                          <p className="text-2xl font-bold text-neutral-800">{progress.hit6.baseline}</p>
                          <p className="text-sm text-neutral-600">{progress.hit6.baselineInterpretation}</p>
                        </div>
                        <div className="bg-white/60 rounded p-3">
                          <p className="text-xs text-neutral-500 uppercase tracking-wide">Phase 3 (Current)</p>
                          <p className="text-2xl font-bold text-neutral-800">{progress.hit6.followUp}</p>
                          <p className="text-sm text-neutral-600">{progress.hit6.followUpInterpretation}</p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full ${getDirectionColor(progress.hit6.direction).badge}`}>
                        {getDirectionIcon(progress.hit6.direction)}
                        <span className="ml-1 font-medium">
                          {progress.hit6.direction === 'improved' 
                            ? `${Math.round(progress.hit6.percentageChange || 0)}% improvement` 
                            : progress.hit6.direction === 'worsened'
                            ? `${Math.round(progress.hit6.percentageChange || 0)}% increase`
                            : 'No change'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-700">
                      Score: {progress.hit6.followUp ?? progress.hit6.baseline} - {progress.hit6.followUpInterpretation || progress.hit6.baselineInterpretation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* MIDAS Detailed Card */}
          {progress.midas && (
            <div className={`rounded-lg border p-5 ${getDirectionColor(progress.midas.direction).bg} ${getDirectionColor(progress.midas.direction).border}`}>
              <div className="flex items-start">
                <div className="mr-4">
                  <ActivitySquare className="h-8 w-8 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium text-lg mb-2 ${getDirectionColor(progress.midas.direction).text}`}>
                    Migraine Disability Assessment (MIDAS)
                  </h3>
                  
                  {progress.midas.baseline !== null && progress.midas.followUp !== null ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/60 rounded p-3">
                          <p className="text-xs text-neutral-500 uppercase tracking-wide">Phase 1 (Baseline)</p>
                          <p className="text-2xl font-bold text-neutral-800">{progress.midas.baseline}</p>
                          <p className="text-sm text-neutral-600">{progress.midas.baselineInterpretation}</p>
                        </div>
                        <div className="bg-white/60 rounded p-3">
                          <p className="text-xs text-neutral-500 uppercase tracking-wide">Phase 3 (Current)</p>
                          <p className="text-2xl font-bold text-neutral-800">{progress.midas.followUp}</p>
                          <p className="text-sm text-neutral-600">{progress.midas.followUpInterpretation}</p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full ${getDirectionColor(progress.midas.direction).badge}`}>
                        {getDirectionIcon(progress.midas.direction)}
                        <span className="ml-1 font-medium">
                          {progress.midas.direction === 'improved' 
                            ? `${Math.round(progress.midas.percentageChange || 0)}% fewer disability days` 
                            : progress.midas.direction === 'worsened'
                            ? `${Math.round(progress.midas.percentageChange || 0)}% increase in disability`
                            : 'No change'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-700">
                      Score: {progress.midas.followUp ?? progress.midas.baseline} - {progress.midas.followUpInterpretation || progress.midas.baselineInterpretation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* GPOC Card */}
          {progress.gpoc && (
            <div className="rounded-lg border p-5 bg-blue-50 border-blue-200">
              <div className="flex items-start">
                <div className="mr-4">
                  <ArrowRight className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2 text-blue-800">
                    Global Perception of Change
                  </h3>
                  <p className="text-neutral-700 mb-2">
                    Your self-reported perception: <strong>{progress.gpoc.interpretation}</strong>
                  </p>
                  <div className="bg-white/60 rounded p-3 inline-block">
                    <p className="text-xs text-neutral-500 uppercase tracking-wide">Rating</p>
                    <p className="text-2xl font-bold text-blue-800">{progress.gpoc.rating}/7</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* PSFS Detailed Card with Activities */}
          {progress.psfs && (
            <div className={`rounded-lg border p-5 ${getDirectionColor(progress.psfs.direction).bg} ${getDirectionColor(progress.psfs.direction).border}`}>
              <div className="flex items-start">
                <div className="mr-4">
                  <Lightbulb className="h-8 w-8 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium text-lg mb-2 ${getDirectionColor(progress.psfs.direction).text}`}>
                    Patient-Specific Functional Scale (PSFS)
                  </h3>
                  
                  {progress.psfs.activities.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-neutral-700 mb-3">
                        How your ability to perform key activities has changed:
                      </p>
                      
                      {/* Activity-by-activity comparison */}
                      <div className="space-y-3">
                        {progress.psfs.activities.map((activity, index) => (
                          <div key={activity.id} className="bg-white/60 rounded p-3">
                            <p className="font-medium text-neutral-800 mb-2">
                              {index + 1}. {activity.text}
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <p className="text-xs text-neutral-500">Before</p>
                                <p className="text-lg font-bold text-neutral-700">{activity.baselineRating}/10</p>
                              </div>
                              <div className="flex-1 flex items-center justify-center">
                                <ArrowRight className="h-5 w-5 text-neutral-400" />
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-neutral-500">After</p>
                                <p className="text-lg font-bold text-neutral-700">{activity.followUpRating}/10</p>
                              </div>
                              <div className={`px-2 py-1 rounded text-sm font-medium ${
                                activity.change > 0 ? 'bg-emerald-100 text-emerald-800' :
                                activity.change < 0 ? 'bg-rose-100 text-rose-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {activity.change > 0 ? `+${activity.change}` : activity.change}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Average Summary */}
                      {progress.psfs.averageBaseline !== null && progress.psfs.averageFollowUp !== null && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-700">Average improvement:</span>
                            <span className={`font-bold ${getDirectionColor(progress.psfs.direction).text}`}>
                              {progress.psfs.averageBaseline.toFixed(1)} → {progress.psfs.averageFollowUp.toFixed(1)}
                              {progress.psfs.percentageChange !== null && (
                                <span className="ml-2">
                                  ({progress.psfs.direction === 'improved' ? '+' : ''}{Math.round(progress.psfs.percentageChange)}%)
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-neutral-700">
                      Average functional ability: {progress.psfs.averageFollowUp?.toFixed(1) || progress.psfs.averageBaseline?.toFixed(1) || 'N/A'}/10
                      {progress.psfs.averageFollowUp && (
                        <span className="block mt-1 text-sm">
                          {getPSFSInterpretation(progress.psfs.averageFollowUp)}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Completion Message */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
        <div className="flex items-start">
          <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg text-emerald-900 mb-2">Program Complete</h3>
            <p className="text-emerald-800">
              You've successfully completed the headache management program. Continue to practice the techniques 
              and exercises you've learned to maintain your progress. If you have any concerns, please consult 
              with your healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayEightContent;
