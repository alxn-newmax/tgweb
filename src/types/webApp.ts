export interface WebAppInitData {
  /**
   * A unique identifier for the Web App session, required for sending messages
   * via the answerWebAppQuery method.
   */
  query_id?: string;
  /** An object containing data about the current user. */
  user?: string;
  /**
   * An object containing data about the chat partner of the current user in the
   * chat where the bot was launched via the attachment menu. Returned only for
   * Web Apps launched via the attachment menu.
   */
  receiver?: WebAppUser;
  /**
   * An object containing data about the chat where the bot was launched via
   * the attachment menu. Returned for supergroups, channels and group chats –
   * only for Web Apps launched via the attachment menu.
   */
  chat?: WebAppChat;
  /**
   * Type of the chat from which the Web App was opened.
   * Can be either “sender” for a private chat with the user opening the link,
   * “private”, “group”, “supergroup”, or “channel”.
   * Returned only for Web Apps launched from direct links.
   */
  chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
  /**
   * Global identifier, uniquely corresponding to the chat from which the Web App was opened.
   * Returned only for Web Apps launched from a direct link.
   */
  chat_instance?: string;
  /**
   * The value of the startattach parameter, passed via link. Only returned for
   * Web Apps when launched from the attachment menu via link. The value of the
   * start_param parameter will also be passed in the GET-parameter
   * tgWebAppStartParam, so the Web App can load the correct interface right
   * away.
   */
  start_param?: string;
  /**
   * Time in seconds, after which a message can be sent via the
   * answerWebAppQuery method.
   */
  can_send_after?: number;
  /** Unix time when the form was opened. */
  auth_date: number;
  /**
   * A hash of all passed parameters, which the bot server can use to check
   * their validity.
   */
  hash: string;
}

export interface WebAppUser {
  id: number;
  /** True, if this user is a bot. Returns in the receiver field only. */
  is_bot?: boolean;
  /** First name of the user or bot. */
  first_name: string;
  /** Last name of the user or bot. */
  last_name?: string;
  /** Username of the user or bot. */
  username?: string;
  /** IETF language tag of the user's language. Returns in user field only. */
  language_code?: string;
  /** True, if this user is a Telegram Premium user. */
  is_premium?: true;
  /** True, if this user added the bot to the attachment menu. */
  added_to_attachment_menu?: true;
  /** True, if this user allowed the bot to message them. */
  allows_write_to_pm?: true;
  /**
   * URL of the user’s profile photo. The photo can be in .jpeg or .svg formats.
   * Only returned for Web Apps launched from the attachment menu.
   */
  photo_url?: string;
}

export interface WebAppTheme {
  colorScheme: 'light' | 'dark';
  headerColor: string;
  backgroundColor: string;
  params: ThemeParams;
}

interface WebAppChat {
  id: number;
  /**
   * Type of chat, can be either “group”, “supergroup” or “channel”
   */
  type: 'group' | 'supergroup' | 'channel';
  /**
   * Title of the chat
   */
  title: string;
  /**
   * Username of the chat
   */
  username?: string;
  /**
   * URL of the chat’s photo. The photo can be in .jpeg or .svg formats. Only
   * returned for Web Apps launched from the attachment menu.
   */
  photo_url?: string;
}

interface ThemeParams {
  /**
   * Background color in the #RRGGBB format. Also available as the CSS variable
   * var(--tg-theme-bg-color).
   */
  bg_color: string;
  /**
   * Main text color in the #RRGGBB format. Also available as the CSS variable
   * var(--tg-theme-text-color).
   */
  text_color: string;
  /**
   * Hint text color in the #RRGGBB format. Also available as the CSS variable
   * var(--tg-theme-hint-color).
   */
  hint_color: string;
  /**
   * Link color in the #RRGGBB format. Also available as the CSS variable
   * var(--tg-theme-link-color).
   */
  link_color: string;
  /**
   * Button color in the #RRGGBB format. Also available as the CSS variable
   * var(--tg-theme-button-color).
   */
  button_color: string;
  /**
   * Button text color in the #RRGGBB format. Also available as the CSS variable
   * var(--tg-theme-button-text-color).
   */
  button_text_color: string;
  /**
   * Optional. Bot API 6.1+ Secondary background color in the #RRGGBB format.
   * Also available as the CSS variable var(--tg-theme-secondary-bg-color).
   */
  secondary_bg_color: string;
}
