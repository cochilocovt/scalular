export type GalleryMediaType = 'image' | 'video';

export interface GalleryItem {
  id: string;
  type: GalleryMediaType;
  src: string;
  alt: string;
  label: string;
  category: string;
  span?: 'col-2' | 'row-2' | 'large' | 'tall' | 'wide' | 'normal';
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/images/trust/sewing-floor-blue.jpg',
    alt: 'Production floor with workers sewing garments in blue uniforms',
    label: 'Sewing Floor',
    category: 'Production',
    span: 'large', // hero
  },
  {
    id: '2',
    type: 'video',
    src: '/images/trust/20250311_124448.mp4',
    alt: 'High speed textile machinery in operation',
    label: 'Knitting Facility',
    category: 'Textile',
    span: 'wide',
  },
  {
    id: '3',
    type: 'image',
    src: '/images/trust/cotton-processing.jpg',
    alt: 'Raw cotton processing facility',
    label: 'Cotton Processing',
    category: 'Raw Materials',
    span: 'tall',
  },
  {
    id: '4',
    type: 'image',
    src: '/images/trust/production-floor-white.jpg',
    alt: 'Modern factory with quality inspection stations',
    label: 'Quality Control',
    category: 'Production',
    span: 'normal',
  },
  {
    id: '5',
    type: 'video',
    src: '/images/trust/20250311_123855.mp4',
    alt: 'Automated spinning machines working',
    label: 'Automated Spinning',
    category: 'Textile',
    span: 'normal',
  },
  {
    id: '6',
    type: 'image',
    src: '/images/trust/fabric-ironing.jpg',
    alt: 'Fabric cutting and ironing station',
    label: 'Finishing',
    category: 'Finishing',
    span: 'normal',
  },
  {
    id: '7',
    type: 'image',
    src: '/images/trust/factory-walkway.jpg',
    alt: 'Factory supervisor inspecting workstations',
    label: 'Factory Walk',
    category: 'Inspection',
    span: 'large',
  },
  {
    id: '8',
    type: 'image',
    src: '/images/trust/yarn-spinning.jpg',
    alt: 'Industrial yarn spinning machinery',
    label: 'Spinning Mills',
    category: 'Textile',
    span: 'wide',
  },
  {
    id: '9',
    type: 'image',
    src: '/images/trust/20250311_121040.jpg',
    alt: 'Heavy duty factory machinery',
    label: 'Machinery',
    category: 'Production',
    span: 'tall',
  },
  {
    id: '10',
    type: 'video',
    src: '/images/trust/20250311_124127.mp4',
    alt: 'Automated winding machines',
    label: 'Winding Lines',
    category: 'Textile',
    span: 'normal',
  },
  {
    id: '11',
    type: 'image',
    src: '/images/trust/20250311_121345.jpg',
    alt: 'Threads and yarns stored neatly',
    label: 'Yarn Storage',
    category: 'Raw Materials',
    span: 'normal',
  },
  {
    id: '12',
    type: 'image',
    src: '/images/trust/20250311_122756.jpg',
    alt: 'Raw cotton processing',
    label: 'Cotton Intake',
    category: 'Raw Materials',
    span: 'large',
  },
];

export const GALLERY_CATEGORIES = ['All', 'Production', 'Textile', 'Raw Materials', 'Finishing', 'Inspection'];
