'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Registration } from '@/lib/types';
import { format, parseISO, startOfDay } from 'date-fns';

interface RegistrationsChartProps {
  registrations: Registration[];
}

export function RegistrationsChart({ registrations }: RegistrationsChartProps) {
  const data = registrations
    .map(reg => ({
      ...reg,
      date: startOfDay(parseISO(reg.registrationDate)).toISOString(),
    }))
    .reduce((acc, reg) => {
      const existing = acc.find(item => item.date === reg.date);
      if (existing) {
        existing.registrations++;
      } else {
        acc.push({ date: reg.date, registrations: 1 });
      }
      return acc;
    }, [] as { date: string; registrations: number }[])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(item => ({
        ...item,
        name: format(parseISO(item.date), 'MMM d'),
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrations Over Time</CardTitle>
        <CardDescription>A summary of new registrations per day.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip 
                    contentStyle={{ 
                        background: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                    }}
                />
                <Bar dataKey="registrations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
