import { Injectable } from "@nestjs/common";

interface MfaEntry {
  code: string;
  expiresAt: number;
}

@Injectable()
export class MfaService {
  private mfaStore = new Map<string, MfaEntry>();

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  storeCode(email: string, code: string) {
    this.mfaStore.set(email, {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000, // expires in 5 mins
    });

    // Auto deletion after expiry i.e. 5 mins
    setTimeout(
      () => {
        this.mfaStore.delete(email);
      },
      5 * 60 * 1000,
    );
  }

  verifyCode(mail: string,inputCode: string): boolean{
    const entry = this.mfaStore.get(mail);
    console.log("verify code mfa service",mail)
    console.log("entry code mfa service",entry)
    if(!entry) return false;

    if(Date.now() > entry.expiresAt){
        this.mfaStore.delete(mail);
        return false;
    }

    if(inputCode !== entry.code){
        console.log("hello inputcode",inputCode)
        return false;
    }

    //Valid OTP -> delete and return true
    this.mfaStore.delete(mail);
    return true;
  }
}
