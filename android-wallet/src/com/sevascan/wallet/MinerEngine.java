package com.sevascan.wallet;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;
public class MinerEngine {
  static { System.loadLibrary("sevascan_jni"); }
  public native byte[] calculateHash(byte[] inputData, byte[] keyData);
  private final AtomicBoolean running = new AtomicBoolean(false);
  private final AtomicLong hashes = new AtomicLong(0);
  private final AtomicLong blocksFound = new AtomicLong(0);
  private String targetAddress = "";
  public void start(String addr) {
    if (running.getAndSet(true)) return;
    targetAddress = addr;
    int cores = Math.max(1, Math.min(4, Runtime.getRuntime().availableProcessors() / 2));
    for (int i = 0; i < cores; i++) {
      final int tid = i;
      new Thread(() -> {
        long nonce = tid * 100000000L;
        byte[] key = new byte[1];
        while (running.get()) {
          byte[] data = (targetAddress + ":" + nonce).getBytes();
          byte[] h = calculateHash(data, key);
          hashes.incrementAndGet();
          if ((h[0] & 0xFF) == 0 && (h[1] & 0xFF) == 0 && (h[2] & 0xFF) < 0x10) {
            blocksFound.incrementAndGet();
          }
          nonce++;
        }
      }).start();
    }
  }
  public void stop() { running.set(false); }
  public boolean isRunning() { return running.get(); }
  public long getHashes() { return hashes.get(); }
  public long getBlocksFound() { return blocksFound.get(); }
}