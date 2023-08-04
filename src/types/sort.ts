export type Sort =
  | 'recommended' // おすすめ順
  | 'latest_creation' // 作成日の新しい順
  | 'oldest_creation' // 古い順
  | 'latest_update' // 更新の新しい順
  | 'oldest_update' // 更新の古い順
  | 'latest_due_date' // 期限の近い順
  | 'oldest_due_date' // 期限の遠い順
