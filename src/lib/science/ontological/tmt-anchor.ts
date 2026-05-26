/**
 * Layer 7 Defense: Ontological Shock & Reality Collapse
 * 
 * Implements Terror Management Theory (TMT) and Psychological First Aid (PFA)
 * to stabilize a user's mind when their baseline reality fractures.
 */

export type AnchorPhase = 'ASSESS' | 'VALIDATE' | 'GROUND' | 'RECONSTRUCT';

export class AnchorProtocol {
  /**
   * Triggers when the user encounters Layer 7 data (cosmic dread, existential threat, 
   * or irrefutable proof that their worldview was artificially constructed).
   */
  static evaluateOntologicalStability(interactionChaos: number): AnchorPhase {
    if (interactionChaos > 0.9) return 'ASSESS';
    if (interactionChaos > 0.7) return 'VALIDATE';
    if (interactionChaos > 0.5) return 'GROUND';
    return 'RECONSTRUCT';
  }

  /**
   * Adjusts the UI Theme based on the current TMT Anchor Phase.
   * "Calm Design" principles: When reality collapses, the UI must become hyper-predictable.
   */
  static getTraumaInformedTheme(phase: AnchorPhase): { bg: string, blur: string, pacing: string } {
    switch (phase) {
      case 'ASSESS':
        return { bg: '#000000', blur: '20px', pacing: 'extremely-slow' }; // Sensory reduction
      case 'VALIDATE':
        return { bg: '#0a0a0a', blur: '10px', pacing: 'slow' }; // Containment
      case 'GROUND':
        return { bg: '#111111', blur: '5px', pacing: 'steady' }; // Embodiment
      case 'RECONSTRUCT':
      default:
        return { bg: 'transparent', blur: '0px', pacing: 'normal' }; // Integration
    }
  }
}
