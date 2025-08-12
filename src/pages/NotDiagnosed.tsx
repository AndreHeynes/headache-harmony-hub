import React, { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotDiagnosed: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Diagnosis required – Headache Program";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "This program requires a confirmed diagnosis of a Primary Headache Disorder or specific secondary headaches (Cervicogenic or TMJ-related)."
      );
    }
  }, []);

  return (
    <PageLayout>
      <main className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Diagnosis required to proceed</h1>
        </header>

        <section className="space-y-3">
          <p className="text-muted-foreground">
            For your safety, this program is designed for:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Primary Headache Disorders</li>
            <li>Secondary Headache Disorders limited to Cervicogenic Headaches</li>
            <li>Secondary Headache Disorders limited to Temporomandibular-related (TMJ) Headaches</li>
          </ul>
          <p className="text-muted-foreground">
            If you don’t have one of the above diagnoses from a licensed medical doctor, please seek a
            clinical evaluation before using this program.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">Seek urgent care if you have any red flags</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Sudden, severe “worst-ever” headache</li>
            <li>Neurological symptoms (weakness, vision/speech changes, confusion)</li>
            <li>Headache after head injury, or with fever/neck stiffness</li>
            <li>Known cancer, immunosuppression, pregnancy complications</li>
            <li>New headache over age 50, or progressively worsening pattern</li>
          </ul>
        </section>

        <section className="flex flex-wrap gap-3 pt-2">
          <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
          <Button onClick={() => window.open("https://healthfinder.gov/FindServices/SearchContext.aspx?topic=833", "_blank")}>Find a clinician</Button>
        </section>
      </main>
    </PageLayout>
  );
};

export default NotDiagnosed;
