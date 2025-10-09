import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Eye, User, Calendar, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface PatientInfo {
  id: string;
  age: string;
  eye: 'left' | 'right' | '';
}

interface PredictionResult {
  class: string;
  confidence: number;
  severity: 'none' | 'mild' | 'moderate' | 'severe' | 'proliferative';
  recommendation: string;
  description: string;
}

const severityColors = {
  none: 'text-green-600 bg-green-50 border-green-200',
  mild: 'text-blue-600 bg-blue-50 border-blue-200',
  moderate: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  severe: 'text-orange-600 bg-orange-50 border-orange-200',
  proliferative: 'text-red-600 bg-red-50 border-red-200'
};

const severityIcons = {
  none: CheckCircle,
  mild: Eye,
  moderate: AlertTriangle,
  severe: AlertTriangle,
  proliferative: XCircle
};

const DetectionTool = () => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ id: '', age: '', eye: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const mockResults: PredictionResult[] = [
    {
      class: 'No Diabetic Retinopathy',
      confidence: 94.2,
      severity: 'none',
      recommendation: 'Continue regular eye examinations as recommended by your healthcare provider.',
      description: 'No signs of diabetic retinopathy detected in the retinal image.'
    },
    {
      class: 'Mild Diabetic Retinopathy',
      confidence: 87.5,
      severity: 'mild',
      recommendation: 'Schedule follow-up examination in 6-12 months. Continue diabetes management.',
      description: 'Early signs of diabetic retinopathy detected with minimal retinal changes.'
    },
    {
      class: 'Moderate Diabetic Retinopathy',
      confidence: 91.8,
      severity: 'moderate',
      recommendation: 'Schedule follow-up examination in 3-6 months. Optimize diabetes control.',
      description: 'Moderate diabetic changes present. Closer monitoring recommended.'
    },
    {
      class: 'Severe Diabetic Retinopathy',
      confidence: 89.3,
      severity: 'severe',
      recommendation: 'Urgent referral to retinal specialist within 1-2 weeks.',
      description: 'Severe diabetic retinopathy detected. Immediate medical attention required.'
    },
    {
      class: 'Proliferative Diabetic Retinopathy',
      confidence: 93.7,
      severity: 'proliferative',
      recommendation: 'URGENT: Immediate referral to retinal specialist for treatment.',
      description: 'Advanced diabetic retinopathy with new blood vessel formation detected.'
    }
  ];
