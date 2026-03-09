import { useState, useCallback } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ShelbyClient } from "@shelby-protocol/sdk/browser";
import { Network } from "@aptos-labs/ts-sdk";

interface UploadOptions {
  blobName: string;
  expiryDays?: number;
  onProgress?: (percent: number) => void;
}

export function useShelbyStorage(apiKey?: string) {
  const { account, connected } = useWallet();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = new ShelbyClient({ network: Network.TESTNET, apiKey });

  const upload = useCallback(async (file: File, options: UploadOptions) => {
    if (!connected || !account) { setError("Wallet not connected"); return null; }
    setUploading(true);
    setError(null);
    try {
      options.onProgress?.(10);
      const blobData = new Uint8Array(await file.arrayBuffer());
      options.onProgress?.(40);
      const expirationMicros = (Date.now() * 1000) + ((options.expiryDays ?? 30) * 864e8 * 1000);
      await client.upload({ account: account as any, blobData, blobName: options.blobName, expirationMicros });
      options.onProgress?.(100);
      return { blobName: options.blobName, size: file.size };
    } catch (err: any) {
      setError(err?.message ?? "Upload failed");
      return null;
    } finally { setUploading(false); }
  }, [connected, account]);

  return { upload, uploading, error, connected };
}
