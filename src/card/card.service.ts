import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
  constructor() {}

  async findOne(cardId: string): Promise<any> {}

  async updateCardbyId(
    cardId: string,
    updateCardSettingsDto: any,
  ): Promise<any> {}
}
