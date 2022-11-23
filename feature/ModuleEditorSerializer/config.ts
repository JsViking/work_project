export const BLOCK_TYPES = {
  /**
   * Блоки
   */
  LEAD: 'lead',
  LINK: 'link',
  BLOCK_LINK: 'block_link',
  BLOCK_LINK_LIST: 'block_link_list',
  TEXT_NODE: 'paragraph',
  BLOCKQUOTE: 'blockquote',
  BLOCKQUOTE_OWNER: 'blockquote_owner',
  BLOCKQUOTE_OWNER_INFO: 'blockquote_owner_info',
  VIDEO: 'video',
  IMAGE: 'image',
  GALLERY: 'gallery',
  HTML_TEXT: 'html_text',
  SURVEY_BLOCK: 'survey_block',
  SURVEY_INTRO: 'survey_intro',
  READ_ALSO: 'read_also',
  IMPORTANT_THOUGHT: 'important_thought',

  /**
   * Embeds, sharing, frame
   */
  IFRAME: 'iframe',
  SHARING: 'sharing',

  BULLETED_LIST: 'ul_list',
  NUMBERED_LIST: 'ol_list',
  LIST_ITEM: 'list_item',

  /*
   * Table
   */
  TABLE: 'table',
  TABLE_ROW: 'table_row',
  TABLE_CELL: 'table_cell',
  TABLE_BODY: 'table_body',
  TABLE_HEAD: 'table_head',

  /*
   * Headings
   */
  HEADING_THREE: 'heading_three',
  HEADING_TWO: 'heading_two',

  /**
   * Горизонтальная линия
   */
  HORIZONTAL_LINE: 'horizontal_line',

  /**
   * Статья дополняется
   */
  TYPE_IN_PROGRESS: 'type_in_progress',

  /**
   * Партнерский блок
   */
  PARTNERSHIP: 'partnership',
};

/**
 * Типы блоков и маркеров
 * @type {Object}
 */

export const EDITOR_TYPES = {
  ...BLOCK_TYPES,
  /**
   * Маркеры
   */
  CODE: 'code',
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKESTHROUGH: 'strikethrough',

  /**
   * Table operators
   */
  INSERT_ROW: 'INSERT_ROW',
  INSERT_COLUMN: 'INSERT_COLUMN',
  DELETE_ROW: 'DELETE_ROW',
  DELETE_COLUMN: 'DELETE_COLUMN',

  /**
   * Data types
   * @type {Object}
   */
  TEXT_ALIGMENT: 'align',
  DATA_ALIGMENT: 'block_aligment',
};
