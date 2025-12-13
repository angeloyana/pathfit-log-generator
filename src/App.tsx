import { ClipboardClock, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { PathfitLogForm } from '@/components/app/pathfit-log-form';
import { Button } from '@/components/ui/button';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="flex h-16 items-center justify-end px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Sun /> : <Moon />}
        </Button>
      </header>
      <div className="container mx-auto p-6">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <div className="bg-muted text-foreground mb-4 flex size-10 items-center justify-center rounded-lg">
            <ClipboardClock />
          </div>
          <h1 className="text-3xl font-bold">
            Speed things up with{' '}
            <span className="from-blue-500 to-pink-500 supports-[background-clip:text]:bg-gradient-to-r supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent">
              Pathfit Log Generator
            </span>
          </h1>
          <p className="text-muted-foreground leading-relaxed text-balance">
            Tired of handwriting and manually calculating your Pathfit log? This website simplifies
            the process by taking user input and automatically creating a Pathfit log PDF that you
            can print.
          </p>
        </div>
        <PathfitLogForm />
      </div>
    </>
  );
}

export default App;
