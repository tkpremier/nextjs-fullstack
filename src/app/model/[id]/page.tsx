import { DriveDbSlider } from '@/components/model/Slider';
import { getModel } from '@/services/db/model';

const ModelPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await getModel(Number(id));
  const model = data[0];
  const images = model.driveFiles.filter(file => file.type === 'image');
  const videos = model.driveFiles.filter(file => file.type === 'video');
  return model ? (
    <div>
      <h2>{model.modelName}</h2>
      {images.length > 0 && <DriveDbSlider carouselTitle={`Images`} key="images" data={images} type="image" />}
      {videos.length > 0 && <DriveDbSlider carouselTitle={`Videos`} key="videos" data={videos} type="video" />}
    </div>
  ) : (
    <div>No model found</div>
  );
};
export default ModelPage;
