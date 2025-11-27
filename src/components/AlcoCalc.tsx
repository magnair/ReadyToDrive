import { useState } from 'react';
import { Box, Slider, ToggleButton, ToggleButtonGroup, TextField, IconButton } from '@mui/material';
import { Typography } from '@mui/material';

const DRINKS = [
  { name: 'Beer', grams: 14 },
  { name: 'Wine', grams: 20 },
  { name: 'Shot', grams: 10 },
];

// Widmark formula (US units)
function calculateBAC(weightKg: number, gender: 'male' | 'female', drinks: { [key: string]: number }) {
  // Convert weight to pounds
  const weightLb = weightKg * 2.20462;
  // Gender constant
  const r = gender === 'male' ? 0.73 : 0.66;
  // Alcohol ounces per drink
  const DRINK_OZ: Record<string, number> = { Beer: 0.6, Wine: 0.6, Shot: 0.6 }; // 1 standard drink ≈ 0.6 oz pure alcohol
  let totalOunces = 0;
  for (const drink of DRINKS) {
    totalOunces += (drinks[drink.name] || 0) * DRINK_OZ[drink.name];
  }
  // Assume all drinks consumed at once, H = 0
  const bac = (totalOunces * 5.14) / (weightLb * r);
  return bac;
}

function hoursToDrive(bac: number) {
  // Legal limit: 0.02 (stricter than 0.08)
  // Metabolism rate: 0.015 BAC per hour
  if (bac <= 0.02) return 0;
  const hours = Math.ceil((bac - 0.02) / 0.015);
  return hours;
}

interface AlcoCalcProps {
  darkMode: boolean;
}

export default function AlcoCalc({ darkMode }: AlcoCalcProps) {
  const [weight, setWeight] = useState(70);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [drinks, setDrinks] = useState<Record<string, number>>({ Beer: 0, Wine: 0, Shot: 0 });

  const bac = calculateBAC(weight, gender, drinks);
  const hours = hoursToDrive(bac);

  // CloudPeak-inspired palette and gradients
  const colors = darkMode
    ? {
        bg: 'linear-gradient(135deg, #0a0f2c 0%, #1a1f3c 100%)',
        paper: 'rgba(20, 24, 50, 0.98)',
        text: '#e3e6f3',
        accent: '#232a4d',
        slider: '#4f5bd5',
        appBar: 'rgba(10, 15, 44, 0.98)',
        highlight: '#4f5bd5',
        safe: '#43a047',
        wait: '#f44336',
        border: '#232a4d',
        glow: '0 0 32px #4f5bd5cc',
      }
    : {
        bg: 'linear-gradient(135deg, #e3e6f3 0%, #f5f7fa 100%)',
        paper: 'rgba(255,255,255,0.98)',
        text: '#222',
        accent: '#e3e6f3',
        slider: '#1976d2',
        appBar: 'rgba(255,255,255,0.98)',
        highlight: '#1976d2',
        safe: '#43a047',
        wait: '#f44336',
        border: '#e3e6f3',
        glow: '0 0 32px #1976d2cc',
      };

  return (
    <Box sx={{ width: { xs: '100%', sm: 480, md: 600 }, background: colors.paper, borderRadius: 6, boxShadow: colors.glow, border: `1px solid ${colors.border}`, p: { xs: 2, sm: 4 }, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, color: colors.text, fontSize: { xs: 28, sm: 40 }, textAlign: 'center', mb: 2, letterSpacing: 1, textShadow: darkMode ? '0 2px 16px #4f5bd5cc' : '0 2px 16px #1976d2cc' }}>
        Elevate Your Drive
      </Typography>
      <Typography variant="h6" sx={{ color: colors.highlight, textAlign: 'center', mb: 3, fontWeight: 500, fontSize: { xs: 18, sm: 24 } }}>
        Alcohol Calculator
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Typography sx={{ fontSize: { xs: 16, sm: 18 }, mb: 1, color: colors.text }}>Weight: <b>{weight} kg</b></Typography>
        <Slider
          value={weight}
          min={40}
          max={120}
          step={1}
          onChange={(_event: Event, v: number | number[]) => setWeight(typeof v === 'number' ? v : weight)}
          sx={{ color: colors.slider }}
        />
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography sx={{ fontSize: { xs: 16, sm: 18 }, mb: 1, color: colors.text }}>Gender:</Typography>
        <ToggleButtonGroup
          value={gender}
          exclusive
          onChange={(_event: React.MouseEvent<HTMLElement>, v: 'male' | 'female' | null) => v && setGender(v)}
          sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 2 }}
        >
          <ToggleButton
            value="male"
            sx={{
              fontWeight: 700,
              color: gender === 'male' ? '#fff' : 'rgba(255,255,255,0.5)',
              bgcolor: gender === 'male' ? colors.highlight : colors.accent,
              flex: 1,
              py: 1,
              fontSize: { xs: 16, sm: 20 },
              borderRadius: 2,
              border: `1px solid ${colors.border}`,
              '&:hover': { 
                bgcolor: colors.highlight, 
                color: '#fff',
                borderColor: colors.highlight,
                boxShadow: `0 0 0 2px ${colors.highlight}66`
              },
              '&.Mui-selected': { 
                bgcolor: colors.highlight, 
                color: '#fff',
                borderColor: colors.highlight,
                boxShadow: `0 0 0 2px ${colors.highlight}66`
              },
              transition: 'all 0.2s',
            }}
          >
            <span style={{ color: gender === 'male' ? '#fff' : 'rgba(255,255,255,0.5)' }}>MALE</span>
          </ToggleButton>
          <ToggleButton
            value="female"
            sx={{
              fontWeight: 700,
              color: gender === 'female' ? '#fff' : 'rgba(255,255,255,0.5)',
              bgcolor: gender === 'female' ? colors.highlight : colors.accent,
              flex: 1,
              py: 1,
              fontSize: { xs: 16, sm: 20 },
              borderRadius: 2,
              border: `1px solid ${colors.border}`,
              '&:hover': { 
                bgcolor: colors.highlight, 
                color: '#fff',
                borderColor: colors.highlight,
                boxShadow: `0 0 0 2px ${colors.highlight}66`
              },
              '&.Mui-selected': { 
                bgcolor: colors.highlight, 
                color: '#fff',
                borderColor: colors.highlight,
                boxShadow: `0 0 0 2px ${colors.highlight}66`
              },
              transition: 'all 0.2s',
            }}
          >
            <span style={{ color: gender === 'female' ? '#fff' : 'rgba(255,255,255,0.5)' }}>FEMALE</span>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography sx={{ fontSize: { xs: 16, sm: 18 }, mb: 1, color: colors.text }}>What did you drink?</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {DRINKS.map(drink => (
            <Box key={drink.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ width: 80, fontSize: { xs: 15, sm: 18 }, color: colors.text }}>{drink.name}</Typography>
              <IconButton
                aria-label={`decrease ${drink.name}`}
                onClick={() => setDrinks(d => ({ ...d, [drink.name]: Math.max(0, d[drink.name] - 1) }))}
                sx={{ bgcolor: colors.accent, color: colors.text, borderRadius: 2, border: `1px solid ${colors.border}`, width: 80, height: 48, fontSize: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                -
              </IconButton>
              <TextField
                type="number"
                size="small"
                value={drinks[drink.name]}
                sx={{ 
                  width: 80, 
                  bgcolor: colors.accent, 
                  borderRadius: 2, 
                  border: `1px solid ${colors.border}`,
                  '& .MuiInputBase-input': { 
                    color: '#fff !important',
                    textAlign: 'center',
                    fontSize: 18,
                    WebkitTextFillColor: '#fff !important'
                  },
                  '& .MuiInputBase-input.Mui-disabled': { 
                    color: '#fff !important',
                    WebkitTextFillColor: '#fff !important'
                  }
                }}
                inputProps={{ 
                  style: { 
                    textAlign: 'center', 
                    color: '#fff',
                    fontSize: 18 
                  } 
                }}
                disabled
              />
              <IconButton
                aria-label={`increase ${drink.name}`}
                onClick={() => setDrinks(d => ({ ...d, [drink.name]: d[drink.name] + 1 }))}
                sx={{ bgcolor: colors.accent, color: colors.text, borderRadius: 2, border: `1px solid ${colors.border}`, width: 80, height: 48, fontSize: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                +
              </IconButton>
              <Typography sx={{ fontSize: { xs: 13, sm: 14 }, color: colors.text, width: 60 }}>glasses</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="h5" sx={{ color: hours === 0 ? colors.safe : colors.wait, fontWeight: 700, fontSize: { xs: 22, sm: 32 }, mb: 1 }}>
          {hours === 0
            ? 'You are ready to drive!'
            : `Wait ${hours} hour${hours > 1 ? 's' : ''} before driving!`}
        </Typography>
        <Typography sx={{ fontSize: { xs: 13, sm: 15 }, color: colors.text, opacity: 0.7 }}>
          (Estimation only. Always drive safely!)
        </Typography>
      </Box>
    </Box>
  );
}