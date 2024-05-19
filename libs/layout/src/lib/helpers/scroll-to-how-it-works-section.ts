import { PATHS } from '@ocean/shared';

export const HOW_IT_WORKS_SECTION_ID = 'how-it-works';

export async function scrollToHowItWorksSection() {
  try {
    await this.router.navigateByUrl(PATHS.HOME, {
      state: {
        [HOW_IT_WORKS_SECTION_ID]: true,
      },
    });

    this.document.getElementById(HOW_IT_WORKS_SECTION_ID)?.scrollIntoView({
      behavior: 'smooth',
    });
  } catch (e) {}
}
