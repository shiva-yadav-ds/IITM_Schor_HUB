import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 pb-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </motion.div>

        {/* Terms of Service */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Terms of Service</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground">Last updated: March 2026</p>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground leading-relaxed">
              <section>
                <h3 className="font-semibold mb-1">1. Acceptance of Terms</h3>
                <p className="text-muted-foreground">By accessing or using StudyMatch, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the platform.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">2. Purpose of the Platform</h3>
                <p className="text-muted-foreground">StudyMatch is an educational platform designed exclusively to help college students find study partners, organize study sessions, and share educational content. This platform is strictly for academic and educational purposes only. Any use outside of this purpose is prohibited.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">3. User Accounts</h3>
                <p className="text-muted-foreground">You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials. Creating fake accounts, impersonating others, or using multiple accounts is strictly prohibited.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">4. Content Guidelines</h3>
                <p className="text-muted-foreground">All content uploaded to StudyMatch must be educational and study-related. Users must only upload their own original content. Re-uploading, copying, or distributing another person's content without permission is a violation of these terms and may result in immediate account termination. Entertainment, memes, promotional material, or any non-educational content is not permitted.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">5. Prohibited Conduct</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>Uploading inappropriate, offensive, hateful, or violent content</li>
                  <li>Harassment, bullying, or threatening other users</li>
                  <li>Spamming or flooding the platform with irrelevant content</li>
                  <li>Attempting to hack, exploit, or disrupt the platform</li>
                  <li>Sharing personal information of other users without consent</li>
                  <li>Using the platform for any commercial or non-educational purpose</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold mb-1">6. Enforcement & Penalties</h3>
                <p className="text-muted-foreground">Violations of these terms will be handled as follows: First offense — Warning. Second offense — Temporary suspension. Third offense — Permanent ban. Severe violations (e.g., hateful content, harassment) may result in an immediate permanent ban without prior warning.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">7. Intellectual Property</h3>
                <p className="text-muted-foreground">All content you upload remains your property. However, by uploading content to StudyMatch, you grant us a non-exclusive license to display and distribute it within the platform. StudyMatch reserves the right to remove any content that violates these terms.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">8. Disclaimer</h3>
                <p className="text-muted-foreground">StudyMatch is provided "as is" without warranties of any kind. We do not guarantee uninterrupted access or the accuracy of any user-generated content. We are not responsible for any disputes between users.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">9. Changes to Terms</h3>
                <p className="text-muted-foreground">We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>
              </section>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Policy */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle>Privacy Policy</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground">Last updated: March 2026</p>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground leading-relaxed">
              <section>
                <h3 className="font-semibold mb-1">1. Information We Collect</h3>
                <p className="text-muted-foreground">We collect information you provide during registration including your name, email address, college, academic level, and subjects of interest. We also collect usage data such as sessions created, shorts uploaded, and interaction patterns to improve the platform experience.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">2. How We Use Your Information</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>To provide and maintain the platform</li>
                  <li>To match you with relevant study partners from your college</li>
                  <li>To display leaderboard rankings and gamification features</li>
                  <li>To send notifications about study sessions and platform updates</li>
                  <li>To enforce community guidelines and prevent misuse</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold mb-1">3. Data Sharing</h3>
                <p className="text-muted-foreground">We do not sell, trade, or share your personal information with third parties for commercial purposes. Your profile information (name, college, subjects) is visible to other students on the platform for study matching purposes.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">4. Data Security</h3>
                <p className="text-muted-foreground">We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">5. Data Retention</h3>
                <p className="text-muted-foreground">We retain your data for as long as your account is active. If your account is banned or deleted, we may retain certain data for moderation and legal compliance purposes.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">6. Your Rights</h3>
                <p className="text-muted-foreground">You have the right to access, update, or delete your personal information at any time through the Settings page. For account deletion requests, please contact the platform administrators.</p>
              </section>

              <section>
                <h3 className="font-semibold mb-1">7. Contact</h3>
                <p className="text-muted-foreground">If you have questions about this Privacy Policy or your data, please reach out to the platform administrators through the app.</p>
              </section>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
