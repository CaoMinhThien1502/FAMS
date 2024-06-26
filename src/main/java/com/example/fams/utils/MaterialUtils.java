package com.example.fams.utils;


import java.io.ByteArrayOutputStream;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class MaterialUtils {

    public static byte[] compressMaterial(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[1024*1024];
        while (!deflater.finished()){
            int size = deflater.deflate(tmp);
            byteArrayOutputStream.write(tmp,0,size);
        }
        try{
            byteArrayOutputStream.close();
        }catch (Exception e){

        }
        return byteArrayOutputStream.toByteArray();
    }

    public static byte[] decompressMaterial(byte[] data){
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[1024*1024];
        try{
            while (!inflater.finished()){
                int count = inflater.inflate(tmp);
                outputStream.write(tmp,0,count);
            }
            outputStream.close();
        }catch (Exception e){

        }
        return outputStream.toByteArray();
    }
}
