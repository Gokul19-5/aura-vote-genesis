import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, FileCheck, User, CheckCircle } from "lucide-react";
import Scene3D from "@/components/3d/Scene3D";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    aadhar: "",
    voterId: "",
    aadharFile: null as File | null,
    voterIdFile: null as File | null,
    faceCapture: null as string | null
  });
  const { toast } = useToast();

  const handleFileUpload = (field: 'aadharFile' | 'voterIdFile', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    if (file) {
      toast({
        title: "Document Uploaded",
        description: `${field === 'aadharFile' ? 'Aadhar' : 'Voter ID'} document uploaded successfully`,
      });
    }
  };

  const handleFaceCapture = () => {
    // Simulate face capture
    setFormData(prev => ({ ...prev, faceCapture: "captured" }));
    toast({
      title: "Face Captured",
      description: "Biometric data captured successfully",
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Registration Successful!",
      description: "Your voter registration has been completed. You can now vote.",
    });
    setStep(4);
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-24">
      {/* 3D Background */}
      <Scene3D cameraPosition={[0, 0, 6]}>
        {/* Floating document icons in 3D space */}
        <mesh position={[-3, 2, -2]} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.1]} />
          <meshStandardMaterial color="#00bfff" transparent opacity={0.3} />
        </mesh>
        <mesh position={[3, -1, -1]} rotation={[-0.3, -0.5, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.1]} />
          <meshStandardMaterial color="#ff00ff" transparent opacity={0.3} />
        </mesh>
      </Scene3D>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-['Orbitron'] mb-4">
              <span className="neon-cyan">Voter</span> <span className="neon-purple">Registration</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Secure your voting rights with biometric verification
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${
                    step >= stepNum ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNum ? 'bg-primary' : 'bg-muted-foreground'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="glass-panel p-8">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <User className="w-16 h-16 neon-cyan mx-auto mb-4" />
                  <h2 className="text-2xl font-bold font-['Orbitron']">Personal Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-lg">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="glass-panel border-glow mt-2"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-lg">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="glass-panel border-glow mt-2"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="aadhar" className="text-lg">Aadhar Number</Label>
                    <Input
                      id="aadhar"
                      value={formData.aadhar}
                      onChange={(e) => setFormData(prev => ({ ...prev, aadhar: e.target.value }))}
                      className="glass-panel border-glow mt-2"
                      placeholder="XXXX XXXX XXXX"
                      maxLength={14}
                    />
                  </div>
                  <div>
                    <Label htmlFor="voterId" className="text-lg">Voter ID</Label>
                    <Input
                      id="voterId"
                      value={formData.voterId}
                      onChange={(e) => setFormData(prev => ({ ...prev, voterId: e.target.value }))}
                      className="glass-panel border-glow mt-2"
                      placeholder="Enter Voter ID"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={() => setStep(2)} 
                  variant="neon" 
                  size="lg" 
                  className="w-full"
                  disabled={!formData.name || !formData.email || !formData.aadhar || !formData.voterId}
                >
                  Continue to Documents
                </Button>
              </div>
            )}

            {/* Step 2: Document Upload */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Upload className="w-16 h-16 neon-purple mx-auto mb-4" />
                  <h2 className="text-2xl font-bold font-['Orbitron']">Document Verification</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-lg">Aadhar Card</Label>
                    <div className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <Upload className="w-12 h-12 neon-cyan mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Click or drag to upload Aadhar card
                      </p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload('aadharFile', e.target.files?.[0] || null)}
                        className="hidden"
                        id="aadhar-upload"
                      />
                      <label htmlFor="aadhar-upload">
                        <Button variant="glass" className="cursor-pointer">
                          {formData.aadharFile ? <FileCheck className="w-4 h-4 mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                          {formData.aadharFile ? 'Uploaded' : 'Choose File'}
                        </Button>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-lg">Voter ID Card</Label>
                    <div className="border-2 border-dashed border-secondary/50 rounded-lg p-8 text-center hover:border-secondary transition-colors">
                      <Upload className="w-12 h-12 neon-purple mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Click or drag to upload Voter ID
                      </p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload('voterIdFile', e.target.files?.[0] || null)}
                        className="hidden"
                        id="voter-upload"
                      />
                      <label htmlFor="voter-upload">
                        <Button variant="glass" className="cursor-pointer">
                          {formData.voterIdFile ? <FileCheck className="w-4 h-4 mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                          {formData.voterIdFile ? 'Uploaded' : 'Choose File'}
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button onClick={() => setStep(1)} variant="glass" size="lg" className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    variant="neon" 
                    size="lg" 
                    className="flex-1"
                    disabled={!formData.aadharFile || !formData.voterIdFile}
                  >
                    Continue to Biometrics
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Biometric Capture */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Camera className="w-16 h-16 neon-green mx-auto mb-4" />
                  <h2 className="text-2xl font-bold font-['Orbitron']">Biometric Verification</h2>
                </div>
                
                <div className="max-w-md mx-auto">
                  <div className="aspect-square border-2 border-accent rounded-lg p-8 text-center bg-card/20 relative overflow-hidden">
                    {!formData.faceCapture ? (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-48 border-4 border-accent rounded-full animate-pulse opacity-50"></div>
                        </div>
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                          <Camera className="w-16 h-16 neon-green mb-4" />
                          <p className="text-sm text-muted-foreground mb-6">
                            Position your face in the circle and click capture
                          </p>
                          <Button onClick={handleFaceCapture} variant="neon">
                            Capture Face
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <CheckCircle className="w-16 h-16 neon-green mb-4" />
                        <p className="text-lg font-semibold neon-green">Face Captured Successfully!</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button onClick={() => setStep(2)} variant="glass" size="lg" className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    variant="neon" 
                    size="lg" 
                    className="flex-1"
                    disabled={!formData.faceCapture}
                  >
                    Complete Registration
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="text-center space-y-6">
                <CheckCircle className="w-24 h-24 neon-green mx-auto animate-bounce" />
                <h2 className="text-3xl font-bold font-['Orbitron'] neon-green">Registration Complete!</h2>
                <p className="text-lg text-muted-foreground">
                  Your voter registration has been processed successfully. You can now participate in elections.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="neon" size="lg" onClick={() => window.location.href = '/vote'}>
                    Go to Voting
                  </Button>
                  <Button variant="glass" size="lg" onClick={() => window.location.href = '/'}>
                    Return Home
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;