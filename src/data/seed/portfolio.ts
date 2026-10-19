import type { PortfolioImage } from '../types';
import { PORTFOLIO_SPEC } from './portfolioSpec';

export const PORTFOLIO: PortfolioImage[] = Object.entries(PORTFOLIO_SPEC).flatMap(([photographerId, groups]) =>
  groups.flatMap((g) =>
    g.ids.map((image, i) => ({ id: `${photographerId}-${g.category}-${i + 1}`, photographerId, category: g.category, image })),
  ),
);
