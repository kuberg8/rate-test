<template>
  <v-container>
    <v-row class="mb-2">
      <v-col v-for="([key, value], i) in Object.entries(prices)" :key="i" cols="12" md="6">
        <v-card
          variant="outlined"
          class="mx-auto cursor-pointer"
          :class="{ active: selectedTariff == key }"
          @click="selectTariff(key as Tariff)"
        >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                {{ key }}
              </div>
              <div class="text-caption mb-1">месяц - {{ toCurrency(value.month, 'RUB') }}</div>
              <div class="text-caption mb-1">год - {{ toCurrency(value.year, 'RUB') }}</div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-form>
      <v-select label="Выберите валюту" v-model="selectedCurrency" :items="currencies" color="green" />
      <v-radio-group v-model="selectedPeriod" color="green">
        <v-radio label="За месяц" value="month" />
        <v-radio label="За год" value="year" />
      </v-radio-group>
    </v-form>

    <v-divider />

    <v-row class="amount">
      <v-col v-if="totalAmount !== null">
        <p>Сумма для оплаты: {{ toCurrency(totalAmount, selectedRate.code) }} ({{ selectedCurrency }})</p>
        <p v-if="discountAmount !== null">Сумма скидки: {{ toCurrency(discountAmount, selectedRate.code) }} ({{ selectedCurrency }})</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'

type Tariff = 'Стандартный' | 'Продвинутый'
type Currency = 'Китайский юань' | 'Казахстанский тенге'
type Period = 'month' | 'year'
type PriceData = {
  month: number
  year: number
}
type ExchangeRateType = {
  value: number
  code: string
}

type ValuteType = {
  [key: string]: {
    CharCode: string
    ID: string
    Name: string
    Nominal: number
    NumCode: string
    Previous: number
    Value: number
  }
}

const toCurrency = (number: number, currency?: string) =>
  number.toLocaleString('ru-RU', { style: 'currency', currency })

const selectedTariff = ref<Tariff | null>(null)
const selectedCurrency = ref<Currency | null>(null)
const selectedPeriod = ref<Period | null>(null)
const currencies = ref<Currency[]>(['Китайский юань', 'Казахстанский тенге'])
const prices: Record<Tariff, PriceData> = {
  Стандартный: { month: 100, year: 1000 },
  Продвинутый: { month: 150, year: 1400 },
}
const exchangeRate: Record<string, ExchangeRateType> = {
  'Китайский юань': { value: 0, code: '' },
  'Казахстанский тенге': { value: 0, code: '' },
}
const totalAmount = ref<number | null>(null)
const discountAmount = ref<number | null>(null)

const selectTariff = (tariff: Tariff) => (selectedTariff.value = tariff)

const selectedRate = computed(
  () =>
    (selectedCurrency.value && exchangeRate[selectedCurrency.value]) || {
      value: 0,
      code: '',
    }
)

onMounted(async () => {
  const { Valute }: { Valute: ValuteType } = await fetch('https://www.cbr-xml-daily.ru/daily_json.js').then((res) =>
    res.json()
  )
  for (const key in Valute) {
    const { Name, Nominal, Value } = Valute[key]

    if (Name in exchangeRate) {
      exchangeRate[Name] = {
        value: Value / Nominal,
        code: key,
      }
    }
  }
})

watch([selectedTariff, selectedCurrency, selectedPeriod], () => {
  if (selectedTariff.value && selectedCurrency.value && selectedPeriod.value) {
    const price = prices[selectedTariff.value][selectedPeriod.value] / selectedRate.value.value
    totalAmount.value = price

    if (selectedPeriod.value === 'year') {
      discountAmount.value =
        (prices[selectedTariff.value]['month'] * 12) / selectedRate.value.value - price
    } else {
      discountAmount.value = null
    }
  }
})
</script>

<style scoped>
.active {
  border-color: green;
}

.amount {
  display: flex;
  min-height: 90px;
}
</style>
