# shelby-react-hooks

> Custom React hooks for building dApps on Shelby Protocol.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Shelby](https://img.shields.io/badge/Shelby-Protocol-c6ff00?style=flat-square&labelColor=0a0a0f)

## Hooks

### useShelbyStorage - Upload with progress tracking
```tsx
const { upload, uploading, error } = useShelbyStorage();

await upload(file, {
  blobName: `uploads/${file.name}`,
  expiryDays: 30,
  onProgress: (pct) => console.log(`${pct}%`),
});
```

### useBlobUrl — Get direct URL to a blob
```tsx
const { url, loading } = useBlobUrl(address, blobName);
return <a href={url}>Download</a>;
```

## License
MIT
