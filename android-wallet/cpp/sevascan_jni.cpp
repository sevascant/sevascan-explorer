#include <jni.h>
#include <stdint.h>
#include <crypto/sha3.h>

extern "C"
JNIEXPORT jbyteArray JNICALL
Java_com_sevascan_wallet_MinerEngine_calculateHash(JNIEnv *env, jobject thiz, jbyteArray input_data, jbyteArray key_data) {
    jbyte* input = env->GetByteArrayElements(input_data, NULL);
    jsize input_len = env->GetArrayLength(input_data);

    unsigned char output_hash[32];
    SHA3_256()
        .Write(Span<const unsigned char>(reinterpret_cast<const unsigned char*>(input), input_len))
        .Finalize(Span<unsigned char>(output_hash, 32));

    env->ReleaseByteArrayElements(input_data, input, JNI_ABORT);

    jbyteArray result = env->NewByteArray(32);
    env->SetByteArrayRegion(result, 0, 32, reinterpret_cast<jbyte*>(output_hash));
    return result;
}
