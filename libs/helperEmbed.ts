const VK_SRC = 'https://vk.com/js/api/openapi.js?152';
const TELEGRAMM_SRC = 'https://telegram.org/js/telegram-widget.js?13';

export const addScript = (
  src: string,
  cb: () => void,
  options = { id: '' }
) => {
  const s = document.createElement('script');
  s.setAttribute('src', src);
  s.id = options.id;
  s.onload = () => {
    if (cb && typeof cb === 'function') cb();
  };
  document.body.appendChild(s);
};

export const vkEmbed = () => {
  const containers = document.querySelectorAll(
    '.article-vk-sharing:empty'
  ) as NodeListOf<HTMLDivElement>;
  if (containers.length === 0) return;

  const addVkEmbed = (container: HTMLDivElement, params: any) => {
    const searchRegExp = /[',"]/g;
    const string = params.replaceAll(searchRegExp, '');
    const paramsArr = string.split(' ');
    if (params.length > 0) {
      const elem = container;
      elem.innerHTML = `<div id=${paramsArr[0]}></div>`;
      // @ts-ignore
      window.VK.Widgets.Post(...paramsArr);
    }
  };

  containers.forEach((container: HTMLDivElement) => {
    // @ts-ignore
    if (window?.VK) {
      addVkEmbed(container, container.dataset.vkSource);
    }
  });
};

export const telegramEmbed = () => {
  const containers = document.querySelectorAll(
    '.article-telegram-sharing:empty'
  );

  if (containers.length === 0) return;

  const renderTelegram = (container: Element, src: string) => {
    const urlObj = document.createElement('a');
    urlObj.href = src;

    const s = document.createElement('script');
    s.async = true;
    s.src = TELEGRAMM_SRC;
    s.dataset.telegramPost = urlObj.pathname
      .replace(/[^a-z0-9_]/gi, '/')
      .slice(1);
    s.dataset.width = '100%';
    s.onload = () => console.log('TELEGRAM EMBED LOAD');
    s.onerror = () => console.log('TELEGRAM EMBED LOAD ERROR');
    container.appendChild(s);
  };

  containers.forEach((container) => {
    // @ts-ignore
    renderTelegram(container, container.dataset.telegramSource);
  });
};
