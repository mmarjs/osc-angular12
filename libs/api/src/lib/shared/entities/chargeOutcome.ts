/**
 * ChargeOutcome
 */

import { ChargeOutcomeRule } from './chargeOutcomeRule';

export interface ChargeOutcome {
  networkStatus?: string;
  reason?: string;
  riskLevel?: string;
  rule?: ChargeOutcomeRule;
  ruleId?: string;
  ruleObject?: ChargeOutcomeRule;
  sellerMessage?: string;
  type?: string;
}
