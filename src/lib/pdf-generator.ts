import { PDFDocument, type PDFPage, rgb, StandardFonts } from 'pdf-lib';

import { config } from './config';
import {
  calculateVo2Max,
  getAge,
  getBmiClassification,
  getIntensity,
  getWaistClassification,
} from './utils';
import type { ActivityLogData, PathfitLogData } from './validators';

async function getPathfitLogTemplate() {
  const res = await fetch('/pathfit-log.pdf');
  return await res.arrayBuffer();
}

export async function generatePathfitLogPdf(data: PathfitLogData) {
  const {
    pathfitNumber,
    periodicTerm,
    startOfTerm,
    name,
    section,
    birthDate,
    sex,

    weight,
    height,
    waistCircumference,

    activityLogs,
    practicalTest,
  } = data;

  const isMidterm = periodicTerm === 'midterm';
  const age = birthDate ? getAge(birthDate) : undefined;
  const pmhr = age ? 220 - age : undefined;

  const pfLogTemplate = await getPathfitLogTemplate();
  const pfLog = await PDFDocument.load(pfLogTemplate);
  const font = await pfLog.embedFont(StandardFonts.Helvetica);

  const pages = pfLog.getPages();
  /**
   * Pathfit log template includes 4 pages: 2 for midterm and 2 for finals.
   * The code below simply picks which pages to use depending on the given periodicTerm.
   */
  const page1 = pages[isMidterm ? 0 : 2];
  const page2 = pages[isMidterm ? 1 : 3];

  const drawPathfitNumber = (page: PDFPage, offsetY = 0) => {
    if (pathfitNumber === undefined) return;
    const { formatter, ...cfg } = config.pathfitNumber;
    page.drawText(formatter(pathfitNumber), {
      font,
      color: rgb(0, 0, 0),
      ...cfg,
      y: cfg.y + offsetY,
    });
  };

  const drawHeader = (page: PDFPage, offsetY = 0) => {
    Object.entries({
      name,
      section,
      birthDate,
      age,
      pmhr,
      ...(pmhr
        ? {
            thrHigh: pmhr * 0.9,
            thrVigorous: pmhr * 0.7,
            thrModerate: pmhr * 0.55,
            thrLight: pmhr * 0.4,
          }
        : {}),
    }).forEach(([key, value]) => {
      if (value === undefined) return;
      const { formatter, ...cfg } = config[key];
      page.drawText(formatter(value), {
        font,
        color: rgb(0, 0, 0),
        size: 10,
        ...cfg,
        y: cfg.y + offsetY,
      });
    });
  };

  const drawMetrics = (
    metrics: { metricsDate?: Date; weight?: number; height?: number; waistCircumference?: number },
    page: PDFPage,
    offsetY = 0
  ) => {
    const { metricsDate, weight, height, waistCircumference } = metrics;
    const bmi = weight && height ? weight / (height * height) : undefined;
    const bmiClassification = bmi ? getBmiClassification(bmi) : undefined;
    const waistClassification =
      waistCircumference && sex ? getWaistClassification(waistCircumference, sex) : undefined;
    const dbw = height ? height * 100 - 100 : undefined;
    const dbwf = dbw ? dbw * 0.9 : undefined;

    Object.entries({
      metricsDate,
      weight,
      height,
      bmi,
      bmiClassification,
      waistCircumference,
      waistClassification,
      dbw,
      dbwf,
    }).forEach(([key, value]) => {
      if (value === undefined) return;
      const { formatter, ...cfg } = config[key];
      page.drawText(formatter(value), {
        font,
        color: rgb(0, 0, 0),
        size: 10,
        ...cfg,
        y: cfg.y + offsetY,
      });
    });
  };

  const drawActivityLog = (data: ActivityLogData, page: PDFPage, offsetY = 0) => {
    const {
      timeStarted,
      timeEnded,
      pulseRateBefore,
      pulseRateAfter,
      exercises,
      foodLog,
      ...activityLog
    } = data;
    const pulseRateBefore3x = pulseRateBefore ? pulseRateBefore * 3 : undefined;
    const pulseRateAfter3x = pulseRateAfter ? pulseRateAfter * 3 : undefined;
    const intensity = pmhr && pulseRateAfter ? getIntensity(pmhr, pulseRateAfter * 3) : undefined;
    const vo2MaxBefore = age && pulseRateBefore ? calculateVo2Max(age, pulseRateBefore) : undefined;
    const vo2MaxAfter = age && pulseRateAfter ? calculateVo2Max(age, pulseRateAfter) : undefined;
    const duration =
      timeStarted && timeEnded
        ? (() => {
            const start = new Date();
            const [sHours, sMinutes] = timeStarted.split(':').map(Number);
            start.setHours(sHours, sMinutes, 0, 0);

            const end = new Date();
            const [eHours, eMinutes] = timeEnded.split(':').map(Number);
            end.setHours(eHours, eMinutes, 0, 0);

            return (end.getTime() - start.getTime()) / 1000;
          })()
        : undefined;
    const totalCalories =
      foodLog && foodLog.length > 0
        ? foodLog.reduce((sum, food) => sum + (food.calories ?? 0), 0)
        : undefined;

    Object.entries({
      ...activityLog,
      timeStarted,
      timeEnded,
      pulseRateBefore,
      pulseRateBefore3x,
      pulseRateAfter,
      pulseRateAfter3x,
      intensity,
      vo2MaxBefore,
      vo2MaxAfter,
      duration,
      totalCalories,
    }).forEach(([key, value]) => {
      if (value === undefined) return;
      const { formatter, ...cfg } = config[key];
      page.drawText(formatter(value), {
        font,
        color: rgb(0, 0, 0),
        size: 10,
        ...cfg,
        x: cfg.x,
        y: cfg.y + offsetY,
      });
    });

    exercises?.forEach((exercise, exerciseIndex) => {
      if (exercise.name) {
        const { formatter, ...opts } = config['exercise.name'];
        page.drawText(formatter(exercise.name), {
          font,
          color: rgb(0, 0, 0),
          size: 10,
          ...opts,
          x: opts.x,
          y: opts.y + offsetY - exerciseIndex * 12,
        });
      }

      if (exercise.frequency) {
        const { formatter, ...cfg } = config['exercise.frequency'];
        const text = formatter(exercise.frequency);
        page.drawText(text, {
          font,
          color: rgb(0, 0, 0),
          size: 10,
          ...cfg,
          x: cfg.x - font.widthOfTextAtSize(text, cfg.size ?? 10),
          y: cfg.y + offsetY - exerciseIndex * 12,
        });
      }
    });

    foodLog?.forEach((food, foodIndex) => {
      if (food.name) {
        const { formatter, ...cfg } = config['foodLog.name'];
        page.drawText(formatter(food.name), {
          font,
          color: rgb(0, 0, 0),
          size: 10,
          ...cfg,
          x: cfg.x,
          y: cfg.y + offsetY - foodIndex * 12,
        });
      }

      if (food.calories) {
        const { formatter, ...cfg } = config['foodLog.calories'];
        const text = formatter(food.calories);
        page.drawText(text, {
          font,
          color: rgb(0, 0, 0),
          size: 10,
          ...cfg,
          x: cfg.x - font.widthOfTextAtSize(text, cfg.size ?? 10),
          y: cfg.y + offsetY - foodIndex * 12,
        });
      }
    });
  };

  drawPathfitNumber(page1);
  drawHeader(page1);
  drawMetrics(
    {
      metricsDate: startOfTerm,
      weight,
      height,
      waistCircumference,
    },
    page1
  );

  activityLogs?.forEach((activityLog, index) => {
    const nextPage = index > 3;
    const currentPage = !nextPage ? page1 : page2;
    const pageIndexer = !nextPage ? index : index - 4;
    drawActivityLog(
      activityLog,
      currentPage,
      -(pageIndexer * 140.3) + (!nextPage ? 0 : isMidterm ? 231 : 233.7)
    );
  });

  const hasSecondPage = (activityLogs?.length ?? -1) > 4 || practicalTest;
  if (hasSecondPage) {
    drawPathfitNumber(page2, 4);
    drawHeader(page2, isMidterm ? 1 : 4);
  }

  if (practicalTest?.metrics) {
    drawMetrics(
      {
        ...practicalTest.metrics,
        metricsDate: practicalTest.activityLog?.date,
      },
      page2,
      isMidterm ? -384 : -381
    );
  }

  if (practicalTest?.activityLog) {
    drawActivityLog(
      {
        ...practicalTest.activityLog,
      },
      page2,
      isMidterm ? -384 : -381.5
    );
  }

  // This removes the unused pages.
  if (isMidterm) {
    pfLog.removePage(2);
    pfLog.removePage(2);
  } else {
    pfLog.removePage(0);
    pfLog.removePage(0);
  }
  if (!hasSecondPage) {
    pfLog.removePage(1);
  }

  const pfLogBytes = await pfLog.save();
  return new Blob([new Uint8Array(pfLogBytes)], { type: 'application/pdf' });
}
