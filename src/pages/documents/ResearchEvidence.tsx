import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResearchEvidence = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded-full hover:bg-neutral-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold">Research Evidence & Methodology</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Evidence-Based Foundation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Recover & Reclaim program integrates multiple evidence-based therapeutic approaches 
            supported by extensive research in headache management, physical therapy, and pain neuroscience.
          </p>
          <p>
            This document outlines the research foundation for our interventions and assessment tools.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Assessment Instruments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Headache Impact Test-6 (HIT-6)</h3>
            <p className="text-sm mb-2">
              <strong>Purpose:</strong> Measures the impact of headaches on quality of life and daily functioning.
            </p>
            <p className="text-sm mb-2">
              <strong>Evidence:</strong> The HIT-6 is a validated, reliable instrument widely used in clinical 
              trials and practice. It demonstrates strong psychometric properties with excellent internal 
              consistency (α = 0.89) and test-retest reliability (r = 0.78-0.90).
            </p>
            <p className="text-sm text-gray-600">
              <em>Source: Kosinski et al., 2003; Yang et al., 2011</em>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Migraine Disability Assessment (MIDAS)</h3>
            <p className="text-sm mb-2">
              <strong>Purpose:</strong> Quantifies headache-related disability over a 3-month period.
            </p>
            <p className="text-sm mb-2">
              <strong>Evidence:</strong> MIDAS demonstrates excellent reliability (ICC = 0.8) and validity, 
              correlating strongly with clinical judgment and other disability measures. It is recommended by 
              the International Headache Society.
            </p>
            <p className="text-sm text-gray-600">
              <em>Source: Stewart et al., 2000; Lipton et al., 2001</em>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Patient-Specific Functional Scale (PSFS)</h3>
            <p className="text-sm mb-2">
              <strong>Purpose:</strong> Measures functional limitations in patient-identified activities.
            </p>
            <p className="text-sm mb-2">
              <strong>Evidence:</strong> PSFS shows excellent reliability (ICC = 0.92) and responsiveness, 
              making it ideal for tracking individual progress in personalized rehabilitation.
            </p>
            <p className="text-sm text-gray-600">
              <em>Source: Stratford et al., 1995; Horn et al., 2012</em>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Pain Self-Efficacy and Catastrophizing</h3>
            <p className="text-sm mb-2">
              <strong>Purpose:</strong> Assesses psychological factors affecting pain management.
            </p>
            <p className="text-sm mb-2">
              <strong>Evidence:</strong> Both constructs are strong predictors of treatment outcomes in 
              chronic pain populations. Interventions targeting these factors demonstrate significant 
              improvements in pain and disability.
            </p>
            <p className="text-sm text-gray-600">
              <em>Source: Nicholas, 2007; Sullivan et al., 1995</em>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Therapeutic Interventions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Manual Therapy & Exercise</h3>
            <p className="text-sm mb-2">
              <strong>Evidence Base:</strong> Systematic reviews and meta-analyses demonstrate that manual 
              therapy combined with exercise is effective for cervicogenic headache and tension-type headache, 
              reducing pain intensity, frequency, and disability.
            </p>
            <p className="text-sm mb-2">
              Specific interventions including neck mobility exercises, progressive strengthening, and 
              myofascial release show moderate to large effect sizes (d = 0.5-1.2) for headache outcomes.
            </p>
            <p className="text-sm text-gray-600">
              <em>Source: Bronfort et al., 2010; Fernández-de-Las-Peñas et al., 2015; Luedtke et al., 2016</em>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Pain Neuroscience Education</h3>
            <p className="text-sm mb-2">
              <strong>Evidence Base:</strong> Pain neuroscience education demonstrates effectiveness in 
              reducing pain, improving function, and modifying pain beliefs in chronic pain populations. 
              Studies show improvements in pain catastrophizing, kinesiophobia, and self-efficacy.
            </p>
            <p className="text-sm text-gray-600">
              <em>Source: Louw et al., 2016; Moseley & Butler, 2015</em>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Cognitive-Behavioral Therapy (CBT)</h3>
            <p className="text-sm mb-2">
              <strong>Evidence Base:</strong> CBT is recognized as a Grade A evidence-based treatment for 
              migraine and tension-type headache. Meta-analyses show significant reductions in headache 
              frequency, intensity, and disability, with effect sizes comparable to pharmacological interventions.
            </p>
            <p className="text-sm text-gray-600">
              <em>Source: Andrasik, 2010; Harris et al., 2015; Holroyd et al., 2001</em>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Relaxation Training</h3>
            <p className="text-sm mb-2">
              <strong>Evidence Base:</strong> Progressive muscle relaxation, breathing exercises, and 
              biofeedback demonstrate efficacy for headache management. Research shows 35-50% reduction 
              in headache activity across multiple trials.
            </p>
            <p className="text-sm text-gray-600">
              <em>Source: Nestoriuc et al., 2008; Penzien et al., 2015</em>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Trigger Management & Lifestyle Modification</h3>
            <p className="text-sm mb-2">
              <strong>Evidence Base:</strong> Systematic identification and management of headache triggers, 
              combined with sleep hygiene and stress management, reduces headache frequency and improves 
              quality of life. Structured self-management programs show sustained benefits.
            </p>
            <p className="text-sm text-gray-600">
              <em>Source: Martin, 2010; Seng & Holroyd, 2014</em>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Multi-Modal Approach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The program's multi-modal approach reflects current best practice guidelines, which recommend 
            combining physical, psychological, and educational interventions for optimal headache management.
          </p>
          <p className="text-sm mb-2">
            <strong>Evidence:</strong> Multi-disciplinary treatments combining exercise, manual therapy, 
            behavioral interventions, and education demonstrate superior outcomes compared to single-modality 
            approaches, with larger effect sizes and more sustained benefits.
          </p>
          <p className="text-sm text-gray-600">
            <em>Source: Chaibi & Russell, 2014; Sun-Edelstein & Mauskop, 2011; Probyn et al., 2017</em>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bibliography</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              Andrasik, F. (2010). Biobehavioral treatment approaches to chronic headache. <em>Neurological Sciences, 31</em>(Suppl 1), S1-S5.
            </p>
            <p>
              Bronfort, G., Nilsson, N., Haas, M., et al. (2010). Non-invasive physical treatments for chronic/recurrent headache. <em>Cochrane Database of Systematic Reviews</em>, (2), CD001878.
            </p>
            <p>
              Chaibi, A., & Russell, M. B. (2014). Manual therapies for primary chronic headaches: a systematic review of randomized controlled trials. <em>Journal of Headache and Pain, 15</em>(1), 67.
            </p>
            <p>
              Fernández-de-Las-Peñas, C., Alonso-Blanco, C., Cuadrado, M. L., & Pareja, J. A. (2015). Spinal manipulative therapy in the management of cervicogenic headache. <em>Headache, 55</em>(Suppl 1), 33-42.
            </p>
            <p>
              Harris, P., Loveman, E., Clegg, A., et al. (2015). Systematic review of cognitive behavioural therapy for the management of headaches and migraines in adults. <em>British Journal of Pain, 9</em>(4), 213-224.
            </p>
            <p>
              Holroyd, K. A., O'Donnell, F. J., Stensland, M., et al. (2001). Management of chronic tension-type headache with tricyclic antidepressant medication, stress management therapy, and their combination. <em>JAMA, 285</em>(17), 2208-2215.
            </p>
            <p>
              Horn, K. K., Jennings, S., Richardson, G., et al. (2012). The Patient-Specific Functional Scale: psychometrics, clinimetrics, and application as a clinical outcome measure. <em>Journal of Orthopaedic & Sports Physical Therapy, 42</em>(1), 30-42.
            </p>
            <p>
              Kosinski, M., Bayliss, M. S., Bjorner, J. B., et al. (2003). A six-item short-form survey for measuring headache impact: the HIT-6. <em>Quality of Life Research, 12</em>(8), 963-974.
            </p>
            <p>
              Lipton, R. B., Stewart, W. F., Sawyer, J., & Edmeads, J. G. (2001). Clinical utility of an instrument assessing migraine disability: the Migraine Disability Assessment (MIDAS) questionnaire. <em>Headache, 41</em>(9), 854-861.
            </p>
            <p>
              Louw, A., Zimney, K., Puentedura, E. J., & Diener, I. (2016). The efficacy of pain neuroscience education on musculoskeletal pain: A systematic review of the literature. <em>Physiotherapy Theory and Practice, 32</em>(5), 332-355.
            </p>
            <p>
              Luedtke, K., Allers, A., Schulte, L. H., & May, A. (2016). Efficacy of interventions used by physiotherapists for patients with headache and migraine—systematic review and meta-analysis. <em>Cephalalgia, 36</em>(5), 474-492.
            </p>
            <p>
              Martin, P. R. (2010). Behavioral management of migraine headache triggers: learning to cope with triggers. <em>Current Pain and Headache Reports, 14</em>(3), 221-227.
            </p>
            <p>
              Moseley, G. L., & Butler, D. S. (2015). Fifteen years of explaining pain: the past, present, and future. <em>Journal of Pain, 16</em>(9), 807-813.
            </p>
            <p>
              Nestoriuc, Y., Martin, A., Rief, W., & Andrasik, F. (2008). Biofeedback treatment for headache disorders: a comprehensive efficacy review. <em>Applied Psychophysiology and Biofeedback, 33</em>(3), 125-140.
            </p>
            <p>
              Nicholas, M. K. (2007). The pain self-efficacy questionnaire: Taking pain into account. <em>European Journal of Pain, 11</em>(2), 153-163.
            </p>
            <p>
              Penzien, D. B., Irby, M. B., Smitherman, T. A., et al. (2015). Well-established and empirically supported behavioral treatments for migraine. <em>Current Pain and Headache Reports, 19</em>(7), 34.
            </p>
            <p>
              Probyn, K., Bowers, H., Mistry, D., et al. (2017). Non-pharmacological self-management for people living with migraine or tension-type headache: a systematic review including analysis of intervention components. <em>BMJ Open, 7</em>(8), e016670.
            </p>
            <p>
              Seng, E. K., & Holroyd, K. A. (2014). Behavioral migraine management modifies behavioral and cognitive coping in people with migraine. <em>Headache, 54</em>(9), 1470-1483.
            </p>
            <p>
              Stewart, W. F., Lipton, R. B., Whyte, J., et al. (2000). An international study to assess reliability of the Migraine Disability Assessment (MIDAS) score. <em>Neurology, 53</em>(5), 988-994.
            </p>
            <p>
              Stratford, P., Gill, C., Westaway, M., & Binkley, J. (1995). Assessing disability and change on individual patients: a report of a patient specific measure. <em>Physiotherapy Canada, 47</em>(4), 258-263.
            </p>
            <p>
              Sullivan, M. J., Bishop, S. R., & Pivik, J. (1995). The Pain Catastrophizing Scale: development and validation. <em>Psychological Assessment, 7</em>(4), 524.
            </p>
            <p>
              Sun-Edelstein, C., & Mauskop, A. (2011). Complementary and alternative approaches to the treatment of tension-type headache. <em>Current Pain and Headache Reports, 15</em>(2), 89-95.
            </p>
            <p>
              Yang, M., Rendas-Baum, R., Varon, S. F., & Kosinski, M. (2011). Validation of the Headache Impact Test (HIT-6™) across episodic and chronic migraine. <em>Cephalalgia, 31</em>(3), 357-367.
            </p>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ResearchEvidence;