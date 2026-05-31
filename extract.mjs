import fs from 'fs';

const homePath = 'src/pages/Home.tsx';
const content = fs.readFileSync(homePath, 'utf8');

const startIndex = content.indexOf('// ── Datos de ejemplo');
const endIndex = content.indexOf('export const Home = () => {');

if (startIndex > -1 && endIndex > -1) {
  const mockupsCode = content.substring(startIndex, endIndex);
  
  const imports = `import { ArrowRight, CheckCircle2, Clock, Users, AlertCircle, CalendarOff, FileDown, Activity, LayoutDashboard, Calendar, Settings, LogOut, ChevronRight, Building2, Megaphone, Target, TrendingUp, X } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';\n\n`;

  fs.writeFileSync('src/components/Mockups.tsx', imports + mockupsCode);
  console.log('Mockups extracted to src/components/Mockups.tsx');
} else {
  console.log('Failed to find boundaries', startIndex, endIndex);
}
