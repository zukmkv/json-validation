interface JsonPreviewProps {
  title: string;
  data: string;
}

export const JsonPreview = ({ title, data }: JsonPreviewProps) => {
  if (!data) return null;

  return (
    <div>
      <h2>{title}</h2>
      <pre>{data}</pre>
    </div>
  );
}