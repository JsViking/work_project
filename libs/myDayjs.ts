import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('ru');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Europe/Moscow');

export default dayjs;
