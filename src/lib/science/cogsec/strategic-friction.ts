/**
 * Layer 5-6 Defense: Cognitive Security (CogSec)
 * 
 * Implements Strategic Algorithmic Friction to break operant conditioning loops
 * and disrupt Dopamine hijacking (Algorithm Nudging).
 */

export interface BiometricState {
  heartRateVariability: number; // SDNN/RMSSD (lower = higher stress)
  screenTimeMinutes: number;
  scrollVelocity: number; // Pixels per second
}

export class CognitiveFirewall {
  /**
   * Military CogSec Principle: The OODA Loop (Observe, Orient, Decide, Act)
   * If the algorithm is predicting the user, we introduce un-computability.
   * If HRV drops and scroll velocity spikes, the user is in a dopamine loop.
   */
  static assessCognitiveLoad(biometrics: BiometricState): number {
    let loadScore = 0;
    
    // Low HRV indicates stress / dysregulation
    if (biometrics.heartRateVariability < 40) loadScore += 30;
    
    // High velocity indicates mindless consumption (doomscrolling)
    if (biometrics.scrollVelocity > 1500) loadScore += 40;
    
    if (biometrics.screenTimeMinutes > 60) loadScore += 20;

    return loadScore; // 0 to 100
  }

  /**
   * Strategic Friction:
   * Returns a calculated delay (in milliseconds) that the UI must forcibly 
   * inject before rendering the next piece of content. This breaks the 
   * immediate stimulus-response reward cycle of the algorithm.
   */
  static calculateFrictionDelay(cognitiveLoad: number): number {
    if (cognitiveLoad > 75) {
      console.log("[CogSec] HIGH COGNITIVE LOAD. Injecting Strategic Friction (3000ms delay).");
      return 3000; 
    } else if (cognitiveLoad > 50) {
      return 1000;
    }
    return 0; // Flow state, no friction
  }
}
