const exposedModules = {
  './ProductApp': async () => {
    const module = await import('/src/App.tsx');
    return module;
  },
};

export function init(shareScope) {
  globalThis.__federation_shared__ = globalThis.__federation_shared__ || {};
  if (!shareScope) {
    return;
  }

  Object.entries(shareScope).forEach(([scopeName, modules]) => {
    if (modules && typeof modules === 'object') {
      const scope = globalThis.__federation_shared__[scopeName] ||= {};
      Object.entries(modules).forEach(([moduleName, moduleValue]) => {
        scope[moduleName] = moduleValue;
      });
    }
  });
}

export function get(moduleName) {
  const loader = exposedModules[moduleName];
  if (!loader) {
    throw new Error(`Remote module not found: ${moduleName}`);
  }
  return Promise.resolve(() => loader());
}
