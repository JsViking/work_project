const FACEBOOK_ID = 856973855080485;

export default class Sharing {
  private url: string;
  private ptitle: string;
  private pimg: string;
  private text: string;
  private window: Window & typeof globalThis;
  private slug: string;

  constructor({ url = '', ptitle = '', pimg = '', text = '', slug = '' }) {
    this.url = url;
    this.ptitle = ptitle;
    this.pimg = pimg;
    this.text = text;
    this.window = window;
    this.slug = slug;
  }

  popup(url: string) {
    this.window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  }

  vkontakte() {
    let url = 'https://vk.com/share.php?';
    url += `url=${encodeURIComponent(this.url)}`;
    url += `&title=${encodeURIComponent(this.ptitle)}`;
    url += `&description=${encodeURIComponent(this.text)}`;
    url += `&image=${encodeURIComponent(this.pimg)}`;
    url += '&noparse=true';
    this.popup(url);
  }

  facebook() {
    let url = 'https://www.facebook.com/dialog/share?';
    url += `app_id=${encodeURIComponent(FACEBOOK_ID)}`;
    url += `&href=${encodeURIComponent(this.url)}`;
    this.popup(url);
  }

  odnoklassniki() {
    let url = 'https://connect.ok.ru/offer?';
    url += `url=${encodeURIComponent(this.url)}`;
    url += `&title=${encodeURIComponent(this.ptitle)}`;
    url += `&description=${encodeURIComponent(this.text)}`;
    url += `&imageUrl=${encodeURIComponent(this.pimg)}`;
    this.popup(url);
  }

  twitter() {
    let url = 'http://twitter.com/share?';
    url += `text=${encodeURIComponent(this.ptitle)}`;
    url += `&url=${encodeURIComponent(this.url)}`;
    url += `&counturl=${encodeURIComponent(this.url)}`;
    this.popup(url);
  }

  telegram() {
    let url = 'https://t.me/share/url?';
    url += `text=${encodeURIComponent(this.ptitle)}`;
    url += `&url=${encodeURIComponent(this.url)}`;
    this.popup(url);
  }

  whatsapp() {
    let url = 'https://api.whatsapp.com/send?';
    url += `text=${encodeURIComponent(this.ptitle)}`;
    url += `&url=${encodeURIComponent(this.url)}`;
    this.popup(url);
  }
}
