export interface WebGLCapabilities {
  supported: boolean;
  isSoftwareGl: boolean;
}

let cachedCapabilities: WebGLCapabilities | null = null;

export function detectWebGLCapabilities(): WebGLCapabilities {
  if (cachedCapabilities) return cachedCapabilities;

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { supported: false, isSoftwareGl: true };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (canvas.getContext('webgl') as WebGLRenderingContext | null);

    if (!gl) {
      cachedCapabilities = { supported: false, isSoftwareGl: true };
      return cachedCapabilities;
    }

    const debugExt = gl.getExtension('WEBGL_debug_renderer_info');
    const param = debugExt ? debugExt.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpuName = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();

    const isSoftwareGl =
      /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpuName);

    cachedCapabilities = {
      supported: true,
      isSoftwareGl,
    };
    return cachedCapabilities;
  } catch {
    cachedCapabilities = { supported: false, isSoftwareGl: true };
    return cachedCapabilities;
  }
}
