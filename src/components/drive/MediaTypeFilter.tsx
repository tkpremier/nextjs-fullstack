import { MediaType, MediaTypeFilterProps } from '@/types';

export const MediaTypeFilter = ({ selectedType, onTypeChange }: MediaTypeFilterProps) => (
  <div style={{ marginBottom: '20px' }}>
    <label htmlFor="media-type-select" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
      Media Type
    </label>
    <select
      id="media-type-select"
      value={selectedType}
      onChange={e => onTypeChange(e.target.value as MediaType)}
      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }}
    >
      <option value="all">All Media</option>
      <option value="image">Images Only</option>
      <option value="video">Videos Only</option>
    </select>
  </div>
);
