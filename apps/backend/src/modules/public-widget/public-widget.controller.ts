import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { AllowedOriginGuard } from '../../guards/allowed-origin.guard';

@UseGuards(AllowedOriginGuard)
@Controller('widget')
export class PublicWidgetController {
  constructor(private prisma: PrismaService) {}

  /* --- tiny embed page --- */
  @Get(':id/embed')
  embed(@Param('id') id: string, @Res() res: Response) {
    // in real life you might serve a React bundle from S3;
    // here we inline a super-simple HTML that fetches availability:
    const html = `
        <!DOCTYPE html><html><head><meta charset="utf-8">
          <style>body{font-family:sans-serif;padding:1rem}</style>
        </head><body>
          <h2 id="title">Loading…</h2><ul id="list"></ul>
          <script>
            const today = new Date().toISOString().slice(0,10);
            fetch('/widget/${id}/availability?date=' + today)
              .then(r => r.json())
              .then(slots => {
                document.getElementById('title').textContent = 'Available today';
                const ul = document.getElementById('list');
                slots.forEach(s => {
                  const li = document.createElement('li');
                  li.textContent = new Date(s.startTime).toLocaleTimeString() +
                                   ' – ' +
                                   new Date(s.endTime).toLocaleTimeString();
                  ul.appendChild(li);
                });
                if (slots.length === 0) ul.textContent = 'No free times';
              })
              .catch(e => (document.body.textContent = 'Error: ' + e));
          </script>
        </body></html>`;
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @Get(':id/availability')
  async availability(@Param('id') id: string, @Query('date') date: string) {
    const day = new Date(date);
    if (Number.isNaN(day.getTime()))
      throw new BadRequestException('Invalid date param (YYYY-MM-DD)');

    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    return this.prisma.timeslot.findMany({
      where: {
        serviceUnit: { widgets: { some: { id } } },
        startTime: { gte: day, lt: nextDay },
        booking: null,
      },
      orderBy: { startTime: 'asc' },
      select: { id: true, startTime: true, endTime: true },
    });
  }
}
