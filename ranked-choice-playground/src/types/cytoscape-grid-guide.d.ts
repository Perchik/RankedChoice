declare module "cytoscape-grid-guide" {
  import { Core } from "cytoscape";

  interface GridGuideOptions {
    snapToGridOnRelease?: boolean;
    snapToAlignmentLocationOnRelease?: boolean;
    guidelines?: boolean;
    guidelinesTolerance?: number;
    guidelinesStyle?: {
      strokeStyle?: string;
      horizontalDistColor?: string;
      verticalDistColor?: string;
      initPosAlignmentColor?: string;
      lineDash?: number[];
    };
  }

  const ext: (options?: GridGuideOptions) => void;
  export = ext;

  interface Core {
    gridGuide(options?: GridGuideOptions): void;
  }
}
