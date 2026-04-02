
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Monitor, AlertTriangle, CheckCircle } from "lucide-react";

interface PostureEducationSectionProps {
  onWorkstationSetup?: (completed: boolean) => void;
}

const PostureEducationSection: React.FC<PostureEducationSectionProps> = ({ onWorkstationSetup }) => {
  const [workstationDone, setWorkstationDone] = useState(false);

  const handleToggle = () => {
    const next = !workstationDone;
    setWorkstationDone(next);
    onWorkstationSetup?.(next);
  };

  return (
    <section className="bg-card rounded-xl p-6 md:p-8 mb-8 border border-border">
      <h2 className="text-2xl font-bold mb-2 text-foreground">Posture Awareness</h2>
      <p className="text-muted-foreground mb-6">Understanding the relationship between posture and headaches.</p>

      {/* Context */}
      <div className="bg-muted rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm text-foreground font-medium mb-1">Research Note</p>
          <p className="text-sm text-muted-foreground">
            There is a poor relationship/correlation between posture and headaches in general. 
            However, those sitting at a desk tend to drift into a <strong className="text-foreground">Forward Head Posture (FHP)</strong>, 
            which can have a theoretical impact on the headache experience.
          </p>
        </div>
      </div>

      {/* Relaxed Sitting Exercise */}
      <div className="bg-muted rounded-lg p-6 mb-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Monitor className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Relaxed Sitting Exercise</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">1</div>
            <div>
              <p className="font-medium text-foreground">Sit as far back into your chair</p>
              <p className="text-sm text-muted-foreground">Position yourself so your back is fully supported by the chair.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">2</div>
            <div>
              <p className="font-medium text-foreground">Slouch naturally</p>
              <p className="text-sm text-muted-foreground">
                Allow the area of your back from buttocks to shoulder blades to relax into the chair. 
                Make sure it is <strong>not pushed</strong> — let it be natural and relaxed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">3</div>
            <div>
              <p className="font-medium text-foreground">Adjust your monitor</p>
              <p className="text-sm text-muted-foreground">
                Position your monitor so that it is in line with your eyes. 
                This way, there is no need to lift your chin up or tilt it down.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workstation setup checklist */}
      <div className="bg-muted rounded-lg p-4 border border-border">
        <div className="flex items-center gap-3">
          <Checkbox checked={workstationDone} onCheckedChange={handleToggle} />
          <div className="flex items-center gap-2">
            {workstationDone && <CheckCircle className="h-4 w-4 text-green-500" />}
            <span className={`font-medium ${workstationDone ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
              I've set up my workstation according to the Relaxed Sitting Exercise
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostureEducationSection;
