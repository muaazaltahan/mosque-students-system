export function columnName(key: string) : string {
  switch (key) {
    case 'id': return 'الرقم';
    case 'name': return 'الاسم';
    case 'attendance': return 'الحضور';
    default: return '';
  }
}
