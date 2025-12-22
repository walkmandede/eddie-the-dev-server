
import type { Request, Response, NextFunction } from "express";

export function apiLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();

  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  let responseBody: any = null;

  res.json = (body: any) => {
    responseBody = body;
    return originalJson(body);
  };

  res.send = (body: any) => {
    responseBody = body;
    return originalSend(body);
  };

  res.on('finish', () => {
    if (process.env.NODE_ENV !== 'production') return;

    const log = {
      request: {
        method: req.method,
        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        params: req.params,
        body: req.body,
      },
      response: {
        statusCode: res.statusCode,
        body: responseBody,
      },
      durationMs: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };

    console.log(JSON.stringify(log));
  });

  next();
}
