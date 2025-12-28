import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}
  getData() {
    console.log('Drawing power for disk operation...');
    this.powerService.supplyPower(20);
    return 'Disk data';
  }
}
